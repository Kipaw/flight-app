import type { Metadata } from "next";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getDashboardStats, getRecentTickets } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard",
};

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

async function StatsSection() {
  const stats = await getDashboardStats();
  const totalTickets = stats.success + stats.pending + stats.failed;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Pendapatan"
          value={rupiah(stats.revenue)}
          hint="Dari tiket berstatus SUCCESS"
        />
        <StatCard
          label="Tiket Terjual"
          value={stats.success}
          hint={`${totalTickets} total tiket tercatat`}
        />
        <StatCard
          label="Menunggu Pembayaran"
          value={stats.pending}
          hint="Tiket berstatus PENDING"
        />
        <StatCard
          label="Pelanggan"
          value={stats.totalCustomers}
          hint="Akun dengan role CUSTOMER"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Penerbangan" value={stats.totalFlights} />
        <StatCard label="Pesawat" value={stats.totalPlanes} />
      </div>
    </div>
  );
}

async function RecentTickets() {
  const tickets = await getRecentTickets();

  return (
    <div className="rounded-lg border">
      <div className="border-b p-5">
        <h2 className="font-semibold">Tiket Terbaru</h2>
      </div>

      {tickets.length === 0 ? (
        <p className="p-5 text-sm text-muted-foreground">Belum ada tiket.</p>
      ) : (
        <ul className="divide-y">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div className="space-y-1">
                <p className="font-medium">{ticket.customer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {ticket.flight.departureCityCode} →{" "}
                  {ticket.flight.destinationCityCode} · Kursi{" "}
                  {ticket.seat.seatNumber} ({ticket.seat.type})
                </p>
                <p className="text-xs text-muted-foreground">
                  {ticket.code} ·{" "}
                  {ticket.bookingDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-semibold">
                  {rupiah(ticket.price)}
                </span>
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full" />
      ))}
    </div>
  );
}

function RecentTicketsSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="my-5 text-2xl font-bold">Dashboard</div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<RecentTicketsSkeleton />}>
        <RecentTickets />
      </Suspense>
    </div>
  );
}
