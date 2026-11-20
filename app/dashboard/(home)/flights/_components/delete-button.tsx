"use client";

import { Trash } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteFlight } from "../lib/actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (!confirm("Hapus flight ini?")) return;
        startTransition(() => deleteFlight(id));
      }}
    >
      <Trash className="mr-2 h-4 w-4" />
      {isPending ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
