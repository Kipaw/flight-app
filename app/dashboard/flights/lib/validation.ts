import { z } from "zod";

export const formFlightSchema = z
  .object({
    planeId: z.string().min(1, "Pesawat wajib dipilih"),
    departureCity: z.string().min(1, "Kota asal wajib diisi"),
    departureCityCode: z.string().min(1, "Kode kota asal wajib diisi"),
    departureDate: z.string().min(1, "Tanggal keberangkatan wajib diisi"),
    destinationCity: z.string().min(1, "Kota tujuan wajib diisi"),
    destinationCityCode: z.string().min(1, "Kode kota tujuan wajib diisi"),
    arrivalDate: z.string().min(1, "Tanggal kedatangan wajib diisi"),
    price: z.coerce.number().int().positive("Harga harus lebih dari 0"),
  })
  .refine((v) => new Date(v.arrivalDate) > new Date(v.departureDate), {
    message: "Tanggal tiba harus setelah tanggal berangkat",
    path: ["arrivalDate"],
  });
