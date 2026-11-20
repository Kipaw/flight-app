"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { dateFormat } from "@/lib/utils";
import type { UserRow } from "../lib/data";

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "emailVerified",
    header: "Verifikasi",
    cell: ({ row }) => (
      <Badge
        className={
          row.original.emailVerified ? "bg-green-500" : "bg-yellow-500"
        }
      >
        {row.original.emailVerified ? "Terverifikasi" : "Belum"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Terdaftar",
    cell: ({ row }) => dateFormat(row.original.createdAt),
  },
];
