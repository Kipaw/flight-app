import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSeatList() {
  return (
    <div className="flex flex-row justify-between gap-5">
      {[0, 1].map((group) => (
        <div key={group} className="flex gap-5">
          {[0, 1].map((column) => (
            <div key={column} className="flex flex-col gap-[19px]">
              {[0, 1, 2, 3, 4].map((row) => (
                <Skeleton
                  key={row}
                  className="h-[60px] w-[60px] rounded-xl bg-white"
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
