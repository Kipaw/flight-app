"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type AuthError = { code?: string; status?: number; message?: string };

function getErrorMessage(error: AuthError) {
  if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
    return "Email atau password salah";
  }
  if (error.code === "EMAIL_NOT_VERIFIED") {
    return "Email belum diverifikasi";
  }
  if (error.status === 429) {
    return "Terlalu banyak percobaan, coba lagi beberapa saat lagi";
  }
  if (error.status && error.status >= 500) {
    return "Terjadi masalah di server, coba lagi nanti";
  }
  return error.message || "Login gagal, coba lagi";
}

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        setError(getErrorMessage(error));
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Tidak bisa terhubung ke server. Periksa koneksi internetmu.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input
        type="email"
        placeholder="Email"
        name="email"
        autoComplete="email"
        required
        aria-invalid={!!error}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="current-password"
        required
        aria-invalid={!!error}
      />

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
}
