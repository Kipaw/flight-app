import { SEAT_VALUES } from "@/lib/utils";
import { parseFilter, type SearchParams } from "../lib/data";
import { labelClass, radioClass } from "./filter-styles";

export default async function FilterClass({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filter = parseFilter(await searchParams);

  return (
    <div className="flex flex-col gap-4">
      {filter.departure && (
        <input type="hidden" name="departure" value={filter.departure} />
      )}
      {filter.arrival && (
        <input type="hidden" name="arrival" value={filter.arrival} />
      )}
      {filter.date && <input type="hidden" name="date" value={filter.date} />}

      <p className="font-semibold">Seat Class</p>
      {Object.entries(SEAT_VALUES).map(([key, seat]) => (
        <label key={key} htmlFor={`seat-${key}`} className={labelClass}>
          <input
            type="radio"
            name="seat"
            id={`seat-${key}`}
            value={key}
            defaultChecked={filter.seat === key}
            className={radioClass}
          />
          {seat.label}
        </label>
      ))}
    </div>
  );
}
