import { Skeleton } from "@/components/ui/skeleton";
import LoadingTicketCard from "./_components/loading-ticket-card";
import TicketHeader from "./_components/ticket-header";

export default function Loading() {
  return (
    <>
      <TicketHeader>
        <div className="title container mx-auto flex max-w-[1130px] flex-col gap-1 px-4 pt-[50px] pb-[68px]">
          <h1 className="text-[32px] leading-[48px] font-bold">My Tickets</h1>
          <Skeleton className="h-[27px] w-[120px]" />
        </div>
      </TicketHeader>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[60px] flex max-w-[1130px] justify-end px-4 pb-[100px]"
      >
        <div className="ticket-container flex w-full max-w-[900px] flex-col gap-6">
          {[0, 1, 2].map((i) => (
            <LoadingTicketCard key={i} />
          ))}
        </div>
      </section>
    </>
  );
}
