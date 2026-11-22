"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { rupiahFormat } from "@/lib/utils";
import { createTicket } from "../lib/actions";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

export default function PaymentDetail({
  seatId,
  total,
}: {
  seatId: string;
  total: number;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setIsLoading(true);
    setError(null);

    const res = await createTicket(seatId);
    if ("error" in res) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    if (!window.snap) {
      setError("Midtrans belum siap, coba lagi sebentar lagi.");
      setIsLoading(false);
      return;
    }

    window.snap.pay(res.token, {
      onSuccess: () => router.push(`/success-checkout?seat=${seatId}`),
      onPending: () => router.push("/my-tickets"),
      onError: () => {
        setError("Pembayaran gagal, coba lagi.");
        setIsLoading(false);
      },
      onClose: () => setIsLoading(false),
    });
  }

  return (
    <div className="flex w-[400px] flex-col gap-[30px]">
      <div className="flex flex-col gap-[18px]">
        <p className="font-semibold">Payment Details</p>
        <div className="flex justify-between">
          <span>Seat Price</span>
          <span className="font-semibold">{rupiahFormat(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Insurance 24%</span>
          <span className="font-semibold">FREE</span>
        </div>
        <div className="flex justify-between">
          <span>Baggage</span>
          <span className="font-semibold">FREE</span>
        </div>
        <div className="flex justify-between">
          <span>Grand Total</span>
          <span className="font-bold text-upwego-light-purple">
            {rupiahFormat(total)}
          </span>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={pay}
        disabled={isLoading}
        className="flex h-12 w-full items-center justify-center rounded-full bg-upwego-light-purple font-bold text-upwego-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] disabled:opacity-60"
      >
        {isLoading ? "Memproses..." : "Checkout with Midtrans"}
      </button>
    </div>
  );
}
