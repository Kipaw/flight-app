import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/get-user";
import FlightCard from "../checkout/_components/flight-card";
import { getUserTicketBySeat } from "./lib/data";

export const metadata: Metadata = {
  title: "Success Checkout",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function SuccessContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { seat: seatId } = await searchParams;
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const ticket =
    typeof seatId === "string"
      ? await getUserTicketBySeat(seatId, user.id)
      : null;
  if (!ticket) notFound();

  return (
    <div className="checkout-container flex items-center justify-center gap-[100px]">
      <FlightCard seat={ticket.seat} user={user} />

      <div className="flex w-fit flex-col gap-[42px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-[32px] leading-[48px] font-bold">
            Success Checkout. <br />
            Enjoy Your Best Flight.
          </h1>
          {ticket.status === "PENDING" && (
            <p className="text-upwego-off-purple">
              Pembayaranmu sedang diverifikasi. Status tiket akan diperbarui
              otomatis.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[14px]">
          <Link
            href="/available-flights"
            className="flex h-12 w-full items-center justify-center rounded-full bg-upwego-light-purple font-bold text-upwego-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
          >
            Book More Flights
          </Link>
          <Link
            href="/my-tickets"
            className="flex h-12 w-full items-center justify-center rounded-full border border-white bg-upwego-black font-semibold transition-all duration-300 hover:border-0 hover:bg-upwego-bg-purple"
          >
            View My Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}

function SuccessSkeleton() {
  return (
    <div className="flex items-center justify-center gap-[100px]">
      <Skeleton className="h-[480px] w-[340px] rounded-[20px] bg-white" />
      <Skeleton className="h-[200px] w-[420px] rounded-[20px]" />
    </div>
  );
}

export default function SuccessCheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <section
        id="Header"
        className="relative h-[290px] bg-[url('/assets/images/background/airplane.png')] bg-cover bg-left-top bg-no-repeat"
      >
        <div className="Header-content h-[290px] bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)]">
          <Navbar />
          <div className="absolute bottom-0 h-[15px] w-full bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)]" />
        </div>
      </section>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[103px] max-w-[1130px] px-4 pb-[100px]"
      >
        <Suspense fallback={<SuccessSkeleton />}>
          <SuccessContent searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
