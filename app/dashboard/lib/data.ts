import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [revenue, statusCounts, totalFlights, totalCustomers, totalPlanes] =
    await Promise.all([
      prisma.ticket.aggregate({
        _sum: { price: true },
        where: { status: "SUCCESS" },
      }),
      prisma.ticket.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.flight.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.airplane.count(),
    ]);

  const count = (status: "PENDING" | "SUCCESS" | "FAILED") =>
    statusCounts.find((s) => s.status === status)?._count._all ?? 0;

  return {
    // price bertipe BigInt, ubah ke Number supaya aman dipakai di JSX
    revenue: Number(revenue._sum.price ?? 0),
    success: count("SUCCESS"),
    pending: count("PENDING"),
    failed: count("FAILED"),
    totalFlights,
    totalCustomers,
    totalPlanes,
  };
}

export async function getRecentTickets() {
  const tickets = await prisma.ticket.findMany({
    take: 5,
    orderBy: { bookingDate: "desc" },
    include: {
      customer: { select: { name: true } },
      flight: {
        select: { departureCityCode: true, destinationCityCode: true },
      },
      seat: { select: { seatNumber: true, type: true } },
    },
  });

  // BigInt tidak bisa di-serialize, jadi ubah price di sini
  return tickets.map((t) => ({ ...t, price: Number(t.price) }));
}
