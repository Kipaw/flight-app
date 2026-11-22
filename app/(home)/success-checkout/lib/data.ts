import { prisma } from "@/lib/prisma";
import { syncPendingTickets } from "@/lib/tickets";

export async function getUserTicketBySeat(seatId: string, userId: string) {
  // Sinkronkan status pembayaran dari Midtrans sebelum membaca data
  await syncPendingTickets(userId);

  return prisma.ticket.findFirst({
    where: { seatId, customerId: userId },
    include: {
      seat: { include: { flight: { include: { plane: true } } } },
    },
  });
}
