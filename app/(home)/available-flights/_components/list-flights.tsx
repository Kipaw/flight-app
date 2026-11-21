import Image from "next/image";
import Link from "next/link";
import { dateFormat, rupiahFormat, SEAT_VALUES } from "@/lib/utils";
import { getFlights, parseFilter, type SearchParams } from "../lib/data";

export default async function ListFlights({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filter = parseFilter(await searchParams);
  const flights = await getFlights(filter);
  const seat = SEAT_VALUES[filter.seat];

  return (
    <div className="ticket-container flex w-full flex-col gap-6">
      {flights.length === 0 && (
        <div className="rounded-[20px] bg-upwego-bg-purple p-5 text-upwego-off-purple">
          Tidak ada penerbangan yang cocok dengan pencarianmu.
        </div>
      )}

      {flights.map((flight) => (
        <div
          key={flight.id}
          className="ticket-card flex items-center justify-between rounded-[20px] bg-upwego-bg-purple p-5"
        >
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
                {seat.label} Class
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[30px]">
            <div className="flex flex-col gap-[2px] text-center">
              <p className="text-lg font-bold">
                {dateFormat(flight.departureDate, "HH:mm")}
              </p>
              <p className="text-sm text-upwego-off-purple">
                {flight.departureCityCode}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
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

          <p className="h-fit w-fit text-lg font-bold">
            {rupiahFormat(flight.price + seat.additionalPrice)}
          </p>

          <Link
            href={`/choose-seat/${flight.id}?seat=${filter.seat}`}
            className="flex h-[48px] items-center rounded-full bg-upwego-light-purple px-5 font-bold text-upwego-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
          >
            Book Flight
          </Link>
        </div>
      ))}
    </div>
  );
}
