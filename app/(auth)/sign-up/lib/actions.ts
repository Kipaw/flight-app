"use server";

import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { ActionResult } from "@/lib/types";
import { userSchema } from "./validation";

export async function signUpUser(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const validate = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passport: formData.get("passport"),
  });

  if (!validate.success) {
    return {
      errorTitle: "Error Validation",
      errorDesc: validate.error.issues.map((issue) => issue.message),
    };
  }

  try {
    await auth.api.signUpEmail({ body: validate.data });
  } catch (e) {
    if (e instanceof APIError) {
      return { errorTitle: "Gagal mendaftar", errorDesc: [e.message] };
    }
    console.error(e);
    return {
      errorTitle: "Gagal mendaftar",
      errorDesc: ["Terjadi kesalahan, coba lagi."],
    };
  }

  redirect("/sign-in");
}
