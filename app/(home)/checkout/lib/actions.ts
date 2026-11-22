"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { getUser } from "@/lib/get-user";
import { createSnapToken } from "@/lib/midtrans";
import { prisma } from "@/lib/prisma";
import { getSeatPrice } from "./data";

export type CreateTicketResult = { token: string } | { error: string };

export async function createTicket(
  seatId: string,
): Promise<CreateTicketResult> {
  const user = await getUser();
  if (!user) return { error: "Silakan masuk terlebih dahulu." };

  const seat = await prisma.flightSeat.findUnique({
    where: { id: seatId },
    include: { flight: true, ticket: true },
  });
  if (!seat) return { error: "Kursi tidak ditemukan." };

  if (seat.ticket) {
    // Tiket PENDING milik user ini: pakai token yang sama, tidak buat tiket baru
    const mine =
      seat.ticket.customerId === user.id &&
      seat.ticket.status === "PENDING" &&
      seat.ticket.tokenMidtrans;
    return mine
      ? { token: seat.ticket.tokenMidtrans as string }
      : { error: "Kursi ini sudah dipesan." };
  }
  if (seat.isBooked) return { error: "Kursi ini sudah dipesan." };

  const amount = getSeatPrice(seat);
  const code = `UPW-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  let token: string;
  try {
    token = await createSnapToken({
      orderId: code,
      amount,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    return { error: "Gagal menghubungi Midtrans, coba lagi." };
  }

  try {
    await prisma.$transaction([
      prisma.ticket.create({
        data: {
          code,
          flightId: seat.flightId,
          customerId: user.id,
          seatId: seat.id,
          bookingDate: new Date(),
          price: BigInt(amount),
          status: "PENDING",
          tokenMidtrans: token,
        },
      }),
      prisma.flightSeat.update({
        where: { id: seat.id },
        data: { isBooked: true },
      }),
    ]);
  } catch (e) {
    // seatId unik di Ticket: kalau dua orang berebut, satu pasti kalah
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { error: "Kursi ini baru saja dipesan orang lain." };
    }
    console.error(e);
    return { error: "Terjadi kesalahan, coba lagi." };
  }

  return { token };
}
