/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const rows = ["Date", "Seat Chosen", "Passenger", "Seat Price"];

export default function LoadingFlightDetail() {
  return (
    <div className="mt-[61px] flex flex-col items-center gap-[30px] pb-[30px]">
      <Skeleton className="h-8 w-[300px]" />

      <div className="flex w-[335px] flex-col items-center gap-[30px]">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex shrink-0 justify-center">
            <img src="/assets/images/icons/plane-dotted-curve.svg" alt="" />
          </div>
          <div className="flex justify-between">
            {[0, 1].map((i) => (
              <div key={i} className="flex flex-col gap-[2px] text-center">
                <Skeleton className="h-5 w-[60px] bg-white" />
                <Skeleton className="h-4 w-[40px] bg-white" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-[130px] w-full rounded-[14px] bg-white" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[2px]">
              <Skeleton className="h-5 w-[100px] bg-white" />
              <Skeleton className="h-5 w-[150px] bg-white" />
            </div>
            <div className="flex h-fit">
              {[0, 1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  src="/assets/images/icons/star-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[10px]">
          {rows.map((label) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <Skeleton className="h-5 w-[60px] bg-white" />
            </div>
          ))}
        </div>

        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}
