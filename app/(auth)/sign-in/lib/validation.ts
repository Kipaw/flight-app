import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});
