import { ArrowRight } from "lucide-react";
import type { FlightWithPlane } from "../lib/data";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(date);

function Point({
  code,
  city,
  date,
}: {
  code: string;
  city: string;
  date: Date;
}) {
  return (
    <div className="text-center">
      <div className="font-bold">{code}</div>
      <div className="font-medium">{city}</div>
      <div className="text-xs text-muted-foreground">{formatDate(date)}</div>
    </div>
  );
}

export default function ColumnRouteFlight({
  flight,
}: {
  flight: FlightWithPlane;
}) {
  return (
    <div className="inline-flex items-center gap-5">
      <Point
        code={flight.departureCityCode}
        city={flight.departureCity}
        date={flight.departureDate}
      />
      <ArrowRight className="h-4 w-4 shrink-0" />
      <Point
        code={flight.destinationCityCode}
        city={flight.destinationCity}
        date={flight.arrivalDate}
      />
    </div>
  );
}
