"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FlightWithPlane } from "../lib/data";
import ColumnRouteFlight from "./column-route-flight";
import ColumnSeatPrice from "./column-seatprice";
import DeleteButton from "./delete-button";

export const columns: ColumnDef<FlightWithPlane>[] = [
  {
    accessorKey: "plane",
    header: "Pesawat",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={flight.plane.image}
            alt={flight.plane.name}
            width={120}
            height={120}
            className="rounded-xl object-cover"
          />
          <span className="font-bold">{flight.plane.name}</span>
        </div>
      );
    },
  },
  {
    id: "route",
    header: "Rute",
    cell: ({ row }) => <ColumnRouteFlight flight={row.original} />,
  },
  {
    id: "seatPrice",
    header: "Harga / Kursi",
    cell: ({ row }) => <ColumnSeatPrice price={row.original.price} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/dashboard/flights/edit/${flight.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteButton id={flight.id} />
        </div>
      );
    },
  },
];
