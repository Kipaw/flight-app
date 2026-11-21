import type { Metadata } from "next";
import { Suspense } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./_components/column-table";
import { getTickets } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Tickets",
};

async function TicketTable() {
  const tickets = await getTickets();

  return <DataTable columns={columns} data={tickets} />;
}

function TicketTableSkeleton() {
  return (
    <div className="space-y-3 rounded-md border p-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export default function TicketsPage() {
  return (
    <>
      <div className="my-5 text-2xl font-bold">Tickets</div>

      <Suspense fallback={<TicketTableSkeleton />}>
        <TicketTable />
      </Suspense>
    </>
  );
}
