import { labelClass, radioClass } from "./filter-styles";

const options = [
  { id: "direct", label: "Direct" },
  { id: "transit", label: "Transit" },
  { id: "transits", label: "Transits ~5" },
];

export default function FilterFlight() {
  return (
    <div className="flex flex-col gap-4 opacity-50">
      <p className="font-semibold">Flight</p>
      {options.map((o) => (
        <label
          key={o.id}
          htmlFor={o.id}
          className={labelClass}
          title="Belum tersedia"
        >
          <input
            type="radio"
            name="flight"
            id={o.id}
            disabled
            className={radioClass}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}
