import { cn, rupiahFormat } from "@/lib/utils";
import type { TicketDetail } from "../../../lib/data";

const statusLabel = {
  SUCCESS: "Success Paid",
  PENDING: "Pending",
  FAILED: "Failed",
} as const;

export default function TransactionDetail({ data }: { data: TicketDetail }) {
  const total = rupiahFormat(data.price);

  return (
    <div className="flex w-[400px] flex-col gap-[30px]">
      <div className="flex flex-col gap-[18px]">
        <p className="font-semibold">Payment Details</p>
        <div className="flex justify-between">
          <span>ID Transaction</span>
          <span className="font-semibold">{data.code}</span>
        </div>
        <div className="flex justify-between">
          <span>Seat Price</span>
          <span className="font-semibold">{total}</span>
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
          <span className="font-bold text-upwego-light-purple">{total}</span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span
            className={cn(
              "font-bold",
              data.status === "SUCCESS" && "text-[#8DFFBA]",
              data.status === "PENDING" && "text-yellow-400",
              data.status === "FAILED" && "text-red-400",
            )}
          >
            {statusLabel[data.status]}
          </span>
        </div>
      </div>
    </div>
  );
}
