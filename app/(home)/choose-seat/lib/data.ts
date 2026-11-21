import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { SEAT_VALUES, type SeatValuesType } from "@/lib/utils";

export type FlightWithSeats = Prisma.FlightGetPayload<{
  include: { plane: true; seats: true };
}>;

export async function getFlightById(
  id: string,
): Promise<FlightWithSeats | null> {
  return prisma.flight.findUnique({
    where: { id },
    include: {
      plane: true,
      seats: { orderBy: { seatNumber: "asc" } },
    },
  });
}

export function parseSeatType(value?: string | string[]): SeatValuesType {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v in SEAT_VALUES ? (v as SeatValuesType) : "ECONOMY";
}
