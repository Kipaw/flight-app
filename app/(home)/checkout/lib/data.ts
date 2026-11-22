import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { SEAT_VALUES } from "@/lib/utils";

export type CheckoutSeat = Prisma.FlightSeatGetPayload<{
  include: { flight: { include: { plane: true } }; ticket: true };
}>;

export async function getCheckoutSeat(
  id: string,
): Promise<CheckoutSeat | null> {
  return prisma.flightSeat.findUnique({
    where: { id },
    include: { flight: { include: { plane: true } }, ticket: true },
  });
}

export function getSeatPrice(seat: {
  type: keyof typeof SEAT_VALUES;
  flight: { price: number };
}) {
  return seat.flight.price + SEAT_VALUES[seat.type].additionalPrice;
}
