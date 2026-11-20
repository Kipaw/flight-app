"use client";

import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({
  iconOnly = false,
}: {
  iconOnly?: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-in");
          router.refresh();
        },
        onError: () => setPending(false),
      },
    });
  }

  const Icon = pending ? Loader2 : LogOut;

  if (iconOnly) {
    return (
      <Button
        type="button"
        size="icon"
        disabled={pending}
        onClick={onClick}
        aria-label="Sign out"
        title="Sign out"
        className="h-[48px] w-[48px] rounded-full bg-red-500 text-white transition-all duration-300 hover:bg-red-600 hover:shadow-[0_10px_20px_0_rgba(239,68,68,0.4)]"
      >
        <Icon className={pending ? "h-5 w-5 animate-spin" : "h-5 w-5"} />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={pending}
      onClick={onClick}
      className="w-full justify-start text-red-500 hover:text-red-500"
    >
      <Icon
        className={pending ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-4 w-4"}
      />
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
