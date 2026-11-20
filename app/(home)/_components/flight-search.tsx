import Image from "next/image";
import { prisma } from "@/lib/prisma";

const selectClass =
  "appearance-none bg-transparent bg-[url(/assets/images/icons/arrow-down.svg)] bg-[right_1px] bg-no-repeat pr-[30px] text-[22px] leading-[26.63px] font-semibold focus:outline-none";

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center gap-[14px]">
      <label htmlFor={htmlFor} className="text-lg">
        {label}
      </label>
      <div className="flex gap-[10px]">
        <div className="flex h-8 w-8 shrink-0 items-center">
          <Image src={icon} alt="" width={32} height={32} />
        </div>
        {children}
      </div>
    </div>
  );
}

const Divider = () => <hr className="h-[60px] border border-[#EDE8F5]" />;

export default async function FlightSearch() {
  const [departures, arrivals] = await Promise.all([
    prisma.flight.findMany({
      distinct: ["departureCityCode"],
      select: { departureCity: true, departureCityCode: true },
      orderBy: { departureCity: "asc" },
    }),
    prisma.flight.findMany({
      distinct: ["destinationCityCode"],
      select: { destinationCity: true, destinationCityCode: true },
      orderBy: { destinationCity: "asc" },
    }),
  ]);

  return (
    <form
      action="/available-flights"
      className="flex w-full items-center justify-between rounded-[20px] bg-white p-5 text-upwego-black"
    >
      <div className="flex items-center gap-[50px] p-5">
        <Field
          label="Departure"
          htmlFor="departure"
          icon="/assets/images/icons/airplane.svg"
        >
          <select name="departure" id="departure" className={selectClass}>
            {departures.map((f) => (
              <option key={f.departureCityCode} value={f.departureCityCode}>
                {f.departureCity}
              </option>
            ))}
          </select>
        </Field>

        <Divider />

        <Field
          label="Arrival"
          htmlFor="arrival"
          icon="/assets/images/icons/airplane.svg"
        >
          <select name="arrival" id="arrival" className={selectClass}>
            {arrivals.map((f) => (
              <option key={f.destinationCityCode} value={f.destinationCityCode}>
                {f.destinationCity}
              </option>
            ))}
          </select>
        </Field>

        <Divider />

        <Field
          label="Departure Date"
          htmlFor="date"
          icon="/assets/images/icons/calendar.svg"
        >
          <input
            type="date"
            name="date"
            id="date"
            className="relative w-[157px] appearance-none bg-transparent text-[22px] leading-[26.63px] font-semibold focus:outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="flex h-[108px] shrink-0 items-center rounded-[18px] bg-upwego-light-purple px-[30px] py-3 text-center text-2xl leading-9 font-bold text-upwego-black transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
      >
        Explore Now
      </button>
    </form>
  );
}
