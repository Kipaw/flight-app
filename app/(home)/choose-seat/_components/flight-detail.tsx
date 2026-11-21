"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type SeatValuesType,
} from "@/lib/utils";
import type { FlightWithSeats } from "../lib/data";
import { useSeat } from "../[id]/providers/seat-provider";

interface FlightDetailProps {
  flight: Omit<FlightWithSeats, "seats">;
  seatType: SeatValuesType;
  isLoggedIn: boolean;
}

export default function FlightDetail({
  flight,
  seatType,
  isLoggedIn,
}: FlightDetailProps) {
  const router = useRouter();
  const { seat } = useSeat();
  const [error, setError] = useState<string | null>(null);
  const selected = SEAT_VALUES[seatType];

  function continueBook() {
    if (!seat) {
      setError("Pilih kursi terlebih dahulu.");
      return;
    }

    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }

    router.push(`/checkout?seat=${seat.id}`);
  }

  return (
    <div className="mt-[61px] flex flex-col items-center gap-[30px] pb-[30px]">
      <h1 className="text-center text-[32px] leading-[48px] font-bold">
        {flight.departureCity} to {flight.destinationCity}
      </h1>

      <div className="flex w-[335px] flex-col items-center gap-[30px]">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex shrink-0 justify-center">
            <img src="/assets/images/icons/plane-dotted-curve.svg" alt="" />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-[2px] text-center">
              <p className="text-lg font-bold">
                {dateFormat(flight.departureDate, "HH:mm")}
              </p>
              <p className="text-sm text-upwego-off-purple">
                {flight.departureCityCode}
              </p>
            </div>
            <div className="flex flex-col gap-[2px] text-center">
              <p className="text-lg font-bold">
                {dateFormat(flight.arrivalDate, "HH:mm")}
              </p>
              <p className="text-sm text-upwego-off-purple">
                {flight.destinationCityCode}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="relative h-[130px] w-full shrink-0 overflow-hidden rounded-[14px]">
            <Image
              src={flight.plane.image}
              alt={flight.plane.name}
              fill
              sizes="335px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[2px]">
              <p className="text-lg font-bold">{flight.plane.name}</p>
              <p className="text-sm text-upwego-grey">
                {flight.plane.code} • {selected.label} Class
              </p>
            </div>
            <div className="flex h-fit">
              {[0, 1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  src="/assets/images/icons/star-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-semibold">
              {dateFormat(flight.departureDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Seat Chosen</span>
            <span className="font-semibold">{seat?.seatNumber ?? "-"}</span>
          </div>
          <div className="flex justify-between">
            <span>Passenger</span>
            <span className="font-semibold">1 Person</span>
          </div>
          <div className="flex justify-between">
            <span>Seat Price</span>
            <span className="font-semibold">
              {rupiahFormat(flight.price + selected.additionalPrice)}
            </span>
          </div>
        </div>

        {error && !seat && (
          <p role="alert" className="w-full text-sm font-medium text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={continueBook}
          className="flex h-12 w-full items-center justify-center rounded-full bg-upwego-light-purple font-bold text-upwego-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
        >
          Continue to Book
        </button>
      </div>
    </div>
  );
}
