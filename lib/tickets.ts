import type { StatusTicket } from "@/lib/generated/prisma/enums";
import { getTransactionStatus, mapStatus } from "@/lib/midtrans";
import { prisma } from "@/lib/prisma";

const HOLD_MS = 30 * 60 * 1000; // sama dengan expiry Snap

type TicketRef = { id: string; seatId: string; status: StatusTicket };

export async function applyTicketStatus(
  ticket: TicketRef,
  status: StatusTicket,
) {
  if (status === "FAILED") {
    // Tiket dihapus dan kursi dibebaskan (seatId di Ticket bersifat unik)
    await prisma.$transaction([
      prisma.ticket.delete({ where: { id: ticket.id } }),
      prisma.flightSeat.update({
        where: { id: ticket.seatId },
        data: { isBooked: false },
      }),
    ]);
    return;
  }

  if (status !== ticket.status) {
    await prisma.ticket.update({ where: { id: ticket.id }, data: { status } });
  }
}

export async function syncPendingTickets(userId: string) {
  const pending = await prisma.ticket.findMany({
    where: { customerId: userId, status: "PENDING" },
    select: {
      id: true,
      code: true,
      seatId: true,
      status: true,
      bookingDate: true,
    },
  });

  await Promise.all(
    pending.map(async (ticket) => {
      try {
        const tx = await getTransactionStatus(ticket.code);

        if (tx?.transaction_status) {
          await applyTicketStatus(
            ticket,
            mapStatus(tx.transaction_status, tx.fraud_status),
          );
        } else if (Date.now() - ticket.bookingDate.getTime() > HOLD_MS) {
          // Tidak pernah dibayar dan sudah lewat batas: lepas kursinya
          await applyTicketStatus(ticket, "FAILED");
        }
      } catch (e) {
        console.error(e);
      }
    }),
  );
}
