import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { SEAT_VALUES, type SeatValuesType } from "@/lib/utils";

type RawParams = Record<string, string | string[] | undefined>;
export type SearchParams = Promise<RawParams>;

export type FlightFilter = {
  departure?: string;
  arrival?: string;
  date?: string;
  seat: SeatValuesType;
  airlines: string[];
};

export type FlightWithPlane = Prisma.FlightGetPayload<{
  include: { plane: true };
}>;

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export function parseFilter(raw: RawParams): FlightFilter {
  const seat = first(raw.seat) ?? "";
  const date = first(raw.date);

  return {
    departure: first(raw.departure) || undefined,
    arrival: first(raw.arrival) || undefined,
    date: date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined,
    seat: seat in SEAT_VALUES ? (seat as SeatValuesType) : "ECONOMY",
    airlines: [raw.airline ?? []].flat(),
  };
}

function buildWhere(filter: FlightFilter): Prisma.FlightWhereInput {
  const where: Prisma.FlightWhereInput = {
    seats: { some: { type: filter.seat, isBooked: false } },
  };

  if (filter.departure) where.departureCityCode = filter.departure;
  if (filter.arrival) where.destinationCityCode = filter.arrival;
  if (filter.airlines.length) where.planeId = { in: filter.airlines };

  if (filter.date) {
    // Satu hari penuh dalam WIB
    const start = new Date(`${filter.date}T00:00:00+07:00`);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    where.departureDate = { gte: start, lt: end };
  }

  return where;
}

export async function getFlights(
  filter: FlightFilter,
): Promise<FlightWithPlane[]> {
  return prisma.flight.findMany({
    where: buildWhere(filter),
    include: { plane: true },
    orderBy: { departureDate: "asc" },
  });
}

export async function getHeader(filter: FlightFilter) {
  const [count, route] = await Promise.all([
    prisma.flight.count({ where: buildWhere(filter) }),
    filter.departure && filter.arrival
      ? prisma.flight.findFirst({
          where: {
            departureCityCode: filter.departure,
            destinationCityCode: filter.arrival,
          },
          select: { departureCity: true, destinationCity: true },
        })
      : null,
  ]);

  return {
    count,
    title: route
      ? `${route.departureCity} to ${route.destinationCity}`
      : "Available Flights",
  };
}

export async function getAirlines() {
  return prisma.airplane.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}
