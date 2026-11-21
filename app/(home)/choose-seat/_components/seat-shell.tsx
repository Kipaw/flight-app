/* eslint-disable @next/next/no-img-element */
const legend = [
  { label: "Selected", className: "bg-upwego-light-purple" },
  { label: "Taken", className: "bg-upwego-dark-grey" },
  { label: "Available", className: "border border-white bg-upwego-black" },
];

export default function SeatShell({
  seats,
  detail,
}: {
  seats: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <section
      id="Choose-Seat"
      className="container mx-auto flex min-h-screen flex-col items-center justify-between pt-10 sm:w-[904px] sm:flex-row sm:items-start sm:pb-0"
    >
      <div className="flex h-[calc(100vh-40px)] items-end">
        <div className="relative flex w-[409px] shrink-0 overflow-visible">
          <div className="plane-body absolute bottom-0 overflow-x-hidden sm:overflow-visible">
            <img
              src="/assets/images/background/plane-body.svg"
              className="z-0"
              alt=""
            />
            <img
              src="/assets/images/background/plane-windshield.svg"
              className="absolute top-[18px] left-1/2 z-10 -translate-x-1/2 transform"
              alt=""
            />
            <div className="absolute bottom-0 left-[54%] -z-10 flex w-[927px] shrink-0 -translate-x-1/2 transform justify-center">
              <img
                src="/assets/images/background/plane-wings.svg"
                className="w-[927px]"
                alt=""
              />
            </div>
          </div>

          <div className="z-50 mb-[30px] flex w-full flex-col gap-5 px-[30px]">
            <div className="flex gap-[30px]">
              {legend.map((item) => (
                <div key={item.label} className="flex items-center gap-[6px]">
                  <div
                    className={`flex h-[14px] w-[14px] shrink-0 rounded-full ${item.className}`}
                  />
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
            {seats}
          </div>
        </div>
      </div>
      {detail}
    </section>
  );
}
