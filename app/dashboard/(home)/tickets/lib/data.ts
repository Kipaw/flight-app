import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type TicketWithRelations = Prisma.TicketGetPayload<{
  include: { flight: true; customer: true; seat: true };
}>;

export async function getTickets(): Promise<TicketWithRelations[]> {
  return prisma.ticket.findMany({
    include: { flight: true, customer: true, seat: true },
    orderBy: { bookingDate: "desc" },
  });
}
