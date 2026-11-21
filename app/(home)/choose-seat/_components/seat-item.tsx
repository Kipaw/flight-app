"use client";

import type { FlightSeat } from "@/lib/generated/prisma/client";
import { useSeat } from "../[id]/providers/seat-provider";

export default function SeatItem({ seat }: { seat: FlightSeat }) {
  const { setSelectedSeat } = useSeat();

  return (
    <div className="group relative flex h-[60px] w-[60px] shrink-0 items-center justify-center">
      <label
        htmlFor={seat.id}
        className="absolute text-[20px] font-bold group-has-[:checked]:text-upwego-black group-has-[:disabled]:text-[#797684]"
      >
        {seat.seatNumber}
      </label>
      <input
        type="radio"
        name="seat"
        id={seat.id}
        onChange={() => setSelectedSeat(seat)}
        disabled={seat.isBooked ?? false}
        className="h-[60px] w-[60px] appearance-none rounded-[15px] ring-2 ring-white checked:bg-upwego-light-purple checked:ring-upwego-light-purple disabled:bg-upwego-dark-grey disabled:ring-0"
      />
    </div>
  );
}
