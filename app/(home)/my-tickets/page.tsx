import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/get-user";
import TicketCard from "./_components/ticket-card";
import TicketHeader from "./_components/ticket-header";
import { getMyTickets } from "./lib/data";

export const metadata: Metadata = {
  title: "My Tickets",
};

export default async function MyTicketsPage() {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const tickets = await getMyTickets(user.id);

  return (
    <>
      <TicketHeader>
        <div className="title container mx-auto flex max-w-[1130px] flex-col gap-1 px-4 pt-[50px] pb-[68px]">
          <h1 className="text-[32px] leading-[48px] font-bold">My Tickets</h1>
          <p className="text-lg leading-[27px] font-medium">
            {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}
          </p>
        </div>
      </TicketHeader>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[60px] flex max-w-[1130px] justify-end px-4 pb-[100px]"
      >
        <div className="ticket-container flex w-full max-w-[900px] flex-col gap-6">
          {tickets.length === 0 && (
            <div className="rounded-[20px] bg-upwego-bg-purple p-5 text-upwego-off-purple">
              Kamu belum punya tiket.{" "}
              <Link
                href="/available-flights"
                className="font-bold text-upwego-light-purple"
              >
                Cari penerbangan
              </Link>
            </div>
          )}

          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} data={ticket} />
          ))}

          <p className="h-fit text-center text-sm text-[#A0A0AC]">
            You’ve reached the end of results.
          </p>
        </div>
      </section>
    </>
  );
}
