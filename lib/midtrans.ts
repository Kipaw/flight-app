import { createHash, timingSafeEqual } from "node:crypto";
import type { StatusTicket } from "@/lib/generated/prisma/enums";

const BASE_URL =
  process.env.NEXT_PUBLIC_MIDTRANS_API_URL ??
  "https://app.sandbox.midtrans.com";
const SNAP_URL = `${BASE_URL}/snap/v1/transactions`;
// Host Snap (app.*) dan host status API (api.*) berbeda
const API_URL = BASE_URL.replace("//app.", "//api.");

export type MidtransNotification = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  fraud_status?: string;
};

export async function createSnapToken(params: {
  orderId: string;
  amount: number;
  name: string;
  email: string;
}) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) throw new Error("MIDTRANS_SERVER_KEY belum diatur");

  const res = await fetch(SNAP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.amount,
      },
      customer_details: { first_name: params.name, email: params.email },
      expiry: { unit: "minutes", duration: 30 },
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Midtrans ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as { token: string };
  return data.token;
}

export async function getTransactionStatus(orderId: string) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) throw new Error("MIDTRANS_SERVER_KEY belum diatur");

  const res = await fetch(`${API_URL}/v2/${orderId}/status`, {
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString("base64")}`,
    },
    cache: "no-store",
  });

  const data = (await res.json()) as {
    status_code?: string;
    transaction_status?: string;
    fraud_status?: string;
  };

  // 404 = belum ada transaksi (popup dibuka tapi tidak jadi dibayar)
  if (!res.ok || data.status_code === "404") return null;
  return data;
}

export function isValidSignature(body: MidtransNotification) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const expected = createHash("sha512")
    .update(
      `${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`,
    )
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(body.signature_key ?? "");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function mapStatus(
  transactionStatus: string,
  fraudStatus?: string,
): StatusTicket {
  if (transactionStatus === "settlement") return "SUCCESS";
  if (transactionStatus === "capture") {
    return fraudStatus === "challenge" ? "PENDING" : "SUCCESS";
  }
  if (transactionStatus === "pending") return "PENDING";
  return "FAILED"; // deny, cancel, expire, failure
}
