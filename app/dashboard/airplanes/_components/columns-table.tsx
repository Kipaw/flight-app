"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Airplane } from "@/lib/generated/prisma/client";
import DeleteButton from "./delete-button";

export const columns: ColumnDef<Airplane>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.image;

      return image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={row.original.name}
          className="h-12 w-20 rounded-md object-cover"
        />
      ) : (
        <div className="flex h-12 w-20 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Plane className="h-5 w-5" />
        </div>
      );
    },
  },
  { accessorKey: "code", header: "Code" },
  { accessorKey: "name", header: "Name" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const plane = row.original;

      return (
        <div className="inline-flex items-center gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/dashboard/airplanes/edit/${plane.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteButton id={plane.id} name={plane.name} />
        </div>
      );
    },
  },
];
