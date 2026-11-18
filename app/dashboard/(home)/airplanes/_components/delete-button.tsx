"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteAirplane } from "../lib/actions";

export default function DeleteButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteAirplane(id);
      if (result.error) window.alert(result.error);
    });
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={onClick}
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="mr-2 h-4 w-4" />
      )}
      Delete
    </Button>
  );
}
