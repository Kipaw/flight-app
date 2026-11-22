import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Benefits from "@/app/(home)/checkout/_components/benefits";
import FlightCard from "@/app/(home)/checkout/_components/flight-card";
import { getUser } from "@/lib/get-user";
import { dateFormat } from "@/lib/utils";
import TicketHeader from "../../_components/ticket-header";
import { getDetailTicket } from "../../lib/data";
import TransactionDetail from "../[id]/components/transaction-detail";

export const metadata: Metadata = {
  title: "Ticket Details",
};

export default async function DetailTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const ticket = await getDetailTicket(id, user.id);
  if (!ticket) notFound();

  return (
    <>
      <TicketHeader>
        <div className="title container mx-auto flex max-w-[1130px] gap-[30px] px-4 pt-[50px] pb-[68px]">
          <p className="flex items-center gap-[30px] text-lg font-medium">
            <Link href="/my-tickets">My Tickets</Link>
            <span>/</span>Details<span>/</span>
          </p>
          <div className="flex flex-col gap-1">
            <h1 className="text-[32px] leading-[48px] font-bold">
              {ticket.flight.departureCity} to {ticket.flight.destinationCity}
            </h1>
            <p className="text-lg leading-[27px] font-medium">
              {dateFormat(ticket.flight.departureDate)}
            </p>
          </div>
        </div>
      </TicketHeader>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[33px] max-w-[1130px] px-4 pb-[100px]"
      >
        <div className="checkout-container flex flex-col gap-[70px] lg:flex-row">
          <FlightCard
            seat={{
              seatNumber: ticket.seat.seatNumber,
              type: ticket.seat.type,
              flight: ticket.flight,
            }}
            user={ticket.customer}
          />
          <div className="mt-[63px] flex flex-col gap-[30px]">
            <Benefits />
            <TransactionDetail data={ticket} />
          </div>
        </div>
      </section>
    </>
  );
}
