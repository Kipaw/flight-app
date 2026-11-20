import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(4, "Nama harus memiliki minimal 4 karakter"),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Email tidak valid"),
  password: z.string().min(8, "Password harus memiliki minimal 8 karakter"),
  passport: z.string().min(1, "Passport tidak boleh kosong"),
});
