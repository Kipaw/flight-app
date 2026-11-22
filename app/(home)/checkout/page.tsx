import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/get-user";
import Benefits from "./_components/benefits";
import FlightCard from "./_components/flight-card";
import PaymentDetail from "./_components/payment-detail";
import { getCheckoutSeat, getSeatPrice } from "./lib/data";

export const metadata: Metadata = {
  title: "Checkout",
};

async function CheckoutContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { seat: seatId } = await searchParams;
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const seat =
    typeof seatId === "string" ? await getCheckoutSeat(seatId) : null;
  if (!seat) notFound();

  const mine =
    seat.ticket?.customerId === user.id && seat.ticket.status === "PENDING";
  const taken = (seat.isBooked || seat.ticket) && !mine;

  if (taken) {
    return (
      <div className="rounded-[20px] bg-upwego-bg-purple p-5">
        <p className="font-semibold">Kursi ini sudah dipesan.</p>
        <Link
          href={`/choose-seat/${seat.flightId}?seat=${seat.type}`}
          className="mt-2 inline-block font-bold text-upwego-light-purple"
        >
          Pilih kursi lain
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container flex flex-col gap-[70px] lg:flex-row">
      <FlightCard seat={seat} user={user} />
      <div className="mt-[63px] flex flex-col gap-[30px]">
        <Benefits />
        <PaymentDetail seatId={seat.id} total={getSeatPrice(seat)} />
      </div>
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="flex flex-col gap-[70px] lg:flex-row">
      <Skeleton className="h-[480px] w-[340px] rounded-[20px] bg-white" />
      <Skeleton className="mt-[63px] h-[320px] w-[400px] rounded-[20px]" />
    </div>
  );
}

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <>
      <section
        id="Header"
        className="relative h-[290px] bg-[url('/assets/images/background/airplane.png')] bg-cover bg-left-top bg-no-repeat"
      >
        <div className="Header-content h-[290px] bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)]">
          <Navbar />
          <div className="title container mx-auto flex max-w-[1130px] flex-col gap-1 px-4 pt-[50px] pb-[68px]">
            <h1 className="text-[32px] leading-[48px] font-bold">Checkout</h1>
            <p className="text-lg leading-[27px] font-medium">
              Enjoy new experience of flight
            </p>
          </div>
          <div className="absolute bottom-0 h-[15px] w-full bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)]" />
        </div>
      </section>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[33px] max-w-[1130px] px-4 pb-[100px]"
      >
        <Suspense fallback={<CheckoutSkeleton />}>
          <CheckoutContent searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
