import type { FlightSeat } from "@/lib/generated/prisma/client";
import SeatItem from "./seat-item";

export default function SeatList({ seats }: { seats: FlightSeat[] }) {
  const columns = ["A", "B", "C", "D"].map((letter) =>
    seats.filter((seat) => seat.seatNumber.startsWith(letter)),
  );

  return (
    <form className="flex flex-row justify-between gap-5">
      {[columns.slice(0, 2), columns.slice(2)].map((group, g) => (
        <div key={g} className="flex gap-5">
          {group.map((column, c) => (
            <div key={c} className="flex flex-col gap-[19px]">
              {column.map((seat) => (
                <SeatItem key={seat.id} seat={seat} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </form>
  );
}
