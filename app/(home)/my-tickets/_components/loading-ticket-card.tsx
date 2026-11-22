/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingTicketCard() {
  return (
    <div className="ticket-card flex items-center justify-between rounded-[20px] bg-upwego-bg-purple p-5">
      <div className="flex items-center gap-[16px]">
        <Skeleton className="h-[70px] w-[90px] rounded-[14px] bg-white" />
        <div className="flex flex-col gap-[2px]">
          <Skeleton className="h-5 w-[60px] bg-white" />
          <Skeleton className="h-5 w-[90px] bg-white" />
        </div>
      </div>
      <Skeleton className="h-5 w-[120px] bg-white" />
      <div className="flex items-center gap-[30px]">
        <div className="flex flex-col gap-[2px] text-center">
          <Skeleton className="h-5 w-[60px] bg-white" />
          <Skeleton className="h-5 w-[40px] bg-white" />
        </div>
        <img src="/assets/images/icons/plane-dotted.svg" alt="" />
        <div className="flex flex-col gap-[2px] text-center">
          <Skeleton className="h-5 w-[60px] bg-white" />
          <Skeleton className="h-5 w-[40px] bg-white" />
        </div>
      </div>
      <Skeleton className="h-[48px] w-[100px] rounded-full bg-white" />
    </div>
  );
}
