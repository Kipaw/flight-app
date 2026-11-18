"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/dashboard/signin");
          router.refresh();
        },
        onError: () => setPending(false),
      },
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={pending}
      onClick={onClick}
      className="w-full justify-start text-red-500 hover:text-red-500"
    >
      {pending ? (
        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 w-4 h-4" />
      )}
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
