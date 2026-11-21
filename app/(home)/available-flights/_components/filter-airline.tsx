import { getAirlines, parseFilter, type SearchParams } from "../lib/data";
import { checkboxClass } from "./filter-styles";

export default async function FilterAirline({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [filter, airlines] = await Promise.all([
    searchParams.then(parseFilter),
    getAirlines(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airlines.map((plane) => (
        <label
          key={plane.id}
          htmlFor={`airline-${plane.id}`}
          className="flex items-center gap-[10px] font-semibold text-white"
        >
          <input
            type="checkbox"
            name="airline"
            id={`airline-${plane.id}`}
            value={plane.id}
            defaultChecked={filter.airlines.includes(plane.id)}
            className={checkboxClass}
          />
          {plane.name}
        </label>
      ))}
    </div>
  );
}
