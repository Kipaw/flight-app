import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { syncPendingTickets } from "@/lib/tickets";

const ticketCardSelect = {
  id: true,
  status: true,
  seat: { select: { type: true } },
  flight: {
    select: {
      departureDate: true,
      arrivalDate: true,
      departureCityCode: true,
      destinationCityCode: true,
      plane: true,
    },
  },
} satisfies Prisma.TicketSelect;

export type MyTicket = Prisma.TicketGetPayload<{
  select: typeof ticketCardSelect;
}>;

export async function getMyTickets(userId: string): Promise<MyTicket[]> {
  // Sinkronkan status pembayaran dari Midtrans sebelum membaca data
  await syncPendingTickets(userId);

  return prisma.ticket.findMany({
    where: { customerId: userId },
    select: ticketCardSelect,
    orderBy: { bookingDate: "desc" },
  });
}

export type TicketDetail = Prisma.TicketGetPayload<{
  include: { flight: { include: { plane: true } }; customer: true; seat: true };
}>;

// customerId ikut difilter: tiket milik orang lain tidak bisa dibuka
export async function getDetailTicket(
  id: string,
  userId: string,
): Promise<TicketDetail | null> {
  return prisma.ticket.findFirst({
    where: { id, customerId: userId },
    include: {
      flight: { include: { plane: true } },
      customer: true,
      seat: true,
    },
  });
}
