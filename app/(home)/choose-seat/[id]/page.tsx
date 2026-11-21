import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/get-user";
import { getFlightById, parseSeatType } from "../lib/data";
import FlightDetail from "../_components/flight-detail";
import SeatList from "../_components/seat-list";
import SeatShell from "../_components/seat-shell";

export const metadata: Metadata = {
  title: "Choose Seat",
};

export default async function ChooseSeatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query, user] = await Promise.all([
    params,
    searchParams,
    getUser(),
  ]);

  const flight = await getFlightById(id);
  if (!flight) notFound();

  const seatType = parseSeatType(query.seat);
  const { seats, ...detail } = flight;

  return (
    <SeatShell
      seats={<SeatList seats={seats.filter((s) => s.type === seatType)} />}
      detail={
        <FlightDetail flight={detail} seatType={seatType} isLoggedIn={!!user} />
      }
    />
  );
}
