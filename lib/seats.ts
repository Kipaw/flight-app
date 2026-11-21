import type { TypeSeat } from "@/lib/generated/prisma/enums";

const TYPES: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];
const COLUMNS = ["A", "B", "C", "D"];
const ROWS = 5;

// 4 kolom x 5 baris untuk tiap kelas = 60 kursi per flight
export function generateSeats() {
  return TYPES.flatMap((type) =>
    COLUMNS.flatMap((col) =>
      Array.from({ length: ROWS }, (_, i) => ({
        seatNumber: `${col}${i + 1}`,
        type,
      })),
    ),
  );
}
