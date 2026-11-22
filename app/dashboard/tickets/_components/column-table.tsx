"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type {
  Flight,
  FlightSeat,
  Ticket,
  User,
} from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";

type TicketType = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

export const columns: ColumnDef<TicketType>[] = [
  {
    accessorKey: "customerId",
    header: "Nama Penumpang",
    cell: ({ row }) => {
      const ticket = row.original;
      return ticket.customer.name;
    },
  },
  {
    accessorKey: "seatId",
    header: "Nomor Kursi",
    cell: ({ row }) => {
      const ticket = row.original;
      return <Badge>{ticket.seat.seatNumber}</Badge>;
    },
  },

  {
    accessorKey: "seatType",
    header: "Kelas",
    cell: ({ row }) => {
      const type = row.original.seat.type;
      return (
        <Badge
          variant="outline"
          className={cn(
            type === "FIRST" && "border-purple-500 text-purple-500",
            type === "BUSINESS" && "border-blue-500 text-blue-500",
            type === "ECONOMY" && "border-gray-500 text-gray-500",
          )}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status Transaksi",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <Badge
          className={cn(
            ticket.status === "SUCCESS"
              ? "bg-green-500"
              : ticket.status === "PENDING"
                ? "bg-yellow-500"
                : "bg-red-500",
          )}
        >
          {ticket.status}
        </Badge>
      );
    },
  },
];
