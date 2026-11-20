"use server";

import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/lib/types";
import { signInSchema } from "./validation";

export async function signInUser(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      errorTitle: "Error Validation",
      errorDesc: validate.error.issues.map((issue) => issue.message),
    };
  }

  try {
    await auth.api.signInEmail({ body: validate.data });
  } catch (e) {
    if (e instanceof APIError) {
      return {
        errorTitle: "Gagal masuk",
        errorDesc: ["Email atau password salah."],
      };
    }
    console.error(e);
    return {
      errorTitle: "Gagal masuk",
      errorDesc: ["Terjadi kesalahan, coba lagi."],
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: validate.data.email },
    select: { role: true },
  });

  redirect(user?.role === "ADMIN" ? "/dashboard" : "/");
}
