/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { dateFormat, SEAT_VALUES } from "@/lib/utils";
import type { MyTicket } from "../lib/data";

export default function TicketCard({ data }: { data: MyTicket }) {
  const { flight, seat } = data;

  return (
    <div className="ticket-card flex items-center justify-between rounded-[20px] bg-upwego-bg-purple p-5">
      <div className="flex items-center gap-[16px]">
        <div className="relative h-[70px] w-[90px] shrink-0 overflow-hidden rounded-[14px]">
          <Image
            src={flight.plane.image}
            alt={flight.plane.name}
            fill
            sizes="90px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-[2px]">
          <p className="text-lg font-bold">{flight.plane.name}</p>
          <p className="text-sm text-upwego-off-purple">
            {SEAT_VALUES[seat.type].label} Class
            {data.status === "PENDING" && (
              <span className="ml-2 text-yellow-400">
                • Menunggu pembayaran
              </span>
            )}
          </p>
        </div>
      </div>

      <p className="h-fit w-fit text-lg font-bold">
        {dateFormat(flight.departureDate)}
      </p>

      <div className="flex items-center gap-[30px]">
        <div className="flex flex-col gap-[2px] text-center">
          <p className="text-lg font-bold">
            {dateFormat(flight.departureDate, "HH:mm")}
          </p>
          <p className="text-sm text-upwego-off-purple">
            {flight.departureCityCode}
          </p>
        </div>
        <img src="/assets/images/icons/plane-dotted.svg" alt="" />
        <div className="flex flex-col gap-[2px] text-center">
          <p className="text-lg font-bold">
            {dateFormat(flight.arrivalDate, "HH:mm")}
          </p>
          <p className="text-sm text-upwego-off-purple">
            {flight.destinationCityCode}
          </p>
        </div>
      </div>

      <Link
        href={`/my-tickets/detail/${data.id}`}
        className="flex h-[48px] items-center rounded-full bg-upwego-light-purple px-5 font-bold text-upwego-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
      >
        Details
      </Link>
    </div>
  );
}
