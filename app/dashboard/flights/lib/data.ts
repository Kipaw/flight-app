import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type FlightWithPlane = Prisma.FlightGetPayload<{
  include: { plane: true };
}>;

export async function getFlights(): Promise<FlightWithPlane[]> {
  return prisma.flight.findMany({
    include: { plane: true },
    orderBy: { departureDate: "asc" },
  });
}
