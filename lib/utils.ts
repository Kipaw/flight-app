export { cn } from "cn";

export const CHECKOUT_KEY = "checkout-data";

export const SEAT_VALUES = {
  ECONOMY: { label: "Economy", additionalPrice: 0 },
  BUSINESS: { label: "Business", additionalPrice: 500_000 },
  FIRST: { label: "First", additionalPrice: 1_000_000 },
} as const;

export type SeatValuesType = keyof typeof SEAT_VALUES;

export const rupiahFormat = (value: number | bigint) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

// Data dari JSON berupa string, jadi terima Date | string
export const dateFormat = (
  date: Date | string,
  format: "HH:mm" | "date" = "date",
) => {
  const d = new Date(date);

  return format === "HH:mm"
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      }).format(d)
    : new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeZone: "Asia/Jakarta",
      }).format(d);
};
