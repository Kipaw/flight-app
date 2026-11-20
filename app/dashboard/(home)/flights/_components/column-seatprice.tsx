import { ChevronDown } from "lucide-react";
import { rupiahFormat, SEAT_VALUES } from "@/lib/utils";

export default function ColumnSeatPrice({ price }: { price: number }) {
  return (
    <div className="w-40">
      {Object.entries(SEAT_VALUES).map(([key, seat]) => (
        <details key={key} className="group border-b py-3 last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between">
            {seat.label}
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pt-2 text-sm font-semibold">
            {rupiahFormat(price + seat.additionalPrice)}
          </div>
        </details>
      ))}
    </div>
  );
}
