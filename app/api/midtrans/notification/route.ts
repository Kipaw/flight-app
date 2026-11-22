import { NextResponse } from "next/server";
import {
  isValidSignature,
  type MidtransNotification,
  mapStatus,
} from "@/lib/midtrans";
import { prisma } from "@/lib/prisma";
import { applyTicketStatus } from "@/lib/tickets";

export async function POST(request: Request) {
  const body = (await request.json()) as MidtransNotification;
  console.log("[midtrans] incoming", body.order_id, body.transaction_status);

  if (!isValidSignature(body)) {
    console.log("[midtrans] invalid signature");
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { code: body.order_id },
  });
  if (!ticket) {
    console.log("[midtrans] ticket not found for", body.order_id);
    return NextResponse.json({ ok: true });
  }
  if (ticket.status === "SUCCESS") {
    console.log("[midtrans] already SUCCESS, skip");
    return NextResponse.json({ ok: true });
  }

  const status = mapStatus(body.transaction_status, body.fraud_status);
  console.log("[midtrans] mapped status:", status);

  await applyTicketStatus(ticket, status);
  console.log("[midtrans] applied", ticket.code, status);

  return NextResponse.json({ ok: true });
}
