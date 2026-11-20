import type { TypeSeat } from "@/lib/generated/prisma/enums";

// Jumlah dan penomoran kursi hanya contoh, sesuaikan dengan kebutuhanmu
const LAYOUT: { type: TypeSeat; prefix: string; count: number }[] = [
  { type: "FIRST", prefix: "A", count: 4 },
  { type: "BUSINESS", prefix: "B", count: 8 },
  { type: "ECONOMY", prefix: "C", count: 24 },
];

export function generateSeats() {
  return LAYOUT.flatMap(({ type, prefix, count }) =>
    Array.from({ length: count }, (_, i) => ({
      seatNumber: `${prefix}${i + 1}`,
      type,
    })),
  );
}
