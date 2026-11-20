import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./flights/_components/columns-flight";
import { getFlights } from "./flights/lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Flights",
};

async function FlightTable() {
  const flights = await getFlights();

  return <DataTable columns={columns} data={flights} />;
}

function FlightTableSkeleton() {
  return (
    <div className="space-y-3 rounded-md border p-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}

export default function FlightPage() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Flights</div>
        <Button asChild>
          <Link href="/dashboard/flights/create">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Data
          </Link>
        </Button>
      </div>

      <Suspense fallback={<FlightTableSkeleton />}>
        <FlightTable />
      </Suspense>
    </>
  );
}
