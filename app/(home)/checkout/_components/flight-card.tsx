import Image from "next/image";
import { dateFormat, SEAT_VALUES } from "@/lib/utils";
import type { CheckoutSeat } from "../lib/data";

type FlightCardSeat = Pick<CheckoutSeat, "seatNumber" | "type" | "flight">;

export default function FlightCard({
  seat,
  user,
}: {
  seat: FlightCardSeat;
  user: { name: string; passport?: string | null };
}) {
  const { flight } = seat;
  const rows = [
    ["Date", dateFormat(flight.departureDate)],
    [
      "Time",
      `${dateFormat(flight.departureDate, "HH:mm")} - ${dateFormat(flight.arrivalDate, "HH:mm")}`,
    ],
    ["Airport", `${flight.departureCityCode} - ${flight.destinationCityCode}`],
    ["Name", user.name],
    ["Seat Chosen", seat.seatNumber],
    ["Passport No.", user.passport ?? "-"],
    ["Passenger", "1 Person"],
  ];

  return (
    <div className="flex w-[340px] flex-col rounded-[20px] bg-white">
      <div className="relative flex flex-col gap-4 border-b-2 border-dotted border-upwego-grey p-[20px_20px_25px]">
        <div className="relative h-[130px] w-[300px] shrink-0 overflow-hidden rounded-[14px] bg-[#EDE8F5]">
          <Image
            src={flight.plane.image}
            alt={flight.plane.name}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <p className="text-lg font-bold text-upwego-black">
              {flight.plane.name}
            </p>
            <p className="text-sm text-upwego-grey">
              {flight.plane.code} • {SEAT_VALUES[seat.type].label} Class
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
        <div className="absolute -bottom-[30px] left-1/2 flex w-[370px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-between">
          <div className="flex h-[30px] w-[30px] shrink-0 rounded-full bg-upwego-black" />
          <div className="flex h-[30px] w-[30px] shrink-0 rounded-full bg-upwego-black" />
        </div>
      </div>

      <div className="flex flex-col gap-[10px] p-[25px_20px_20px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between text-upwego-black">
            <span>{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
