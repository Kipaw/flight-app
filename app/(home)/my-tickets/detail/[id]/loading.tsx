import { Skeleton } from "@/components/ui/skeleton";
import TicketHeader from "../../_components/ticket-header";

export default function Loading() {
  return (
    <>
      <TicketHeader>
        <div className="title container mx-auto flex max-w-[1130px] gap-[30px] px-4 pt-[50px] pb-[68px]">
          <p className="flex items-center gap-[30px] text-lg font-medium">
            My Tickets<span>/</span>Details<span>/</span>
          </p>
          <Skeleton className="h-[48px] w-[320px]" />
        </div>
      </TicketHeader>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[33px] max-w-[1130px] px-4 pb-[100px]"
      >
        <div className="flex flex-col gap-[70px] lg:flex-row">
          <Skeleton className="h-[480px] w-[340px] rounded-[20px] bg-white" />
          <Skeleton className="mt-[63px] h-[320px] w-[400px] rounded-[20px]" />
        </div>
      </section>
    </>
  );
}
