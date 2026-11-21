"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { FlightSeat } from "@/lib/generated/prisma/client";

export type SeatContextType = {
  seat: FlightSeat | null;
  setSelectedSeat: (seat: FlightSeat) => void;
};

const SeatContext = createContext<SeatContextType | null>(null);

export default function SeatProvider({ children }: { children: ReactNode }) {
  const [seat, setSelectedSeat] = useState<FlightSeat | null>(null);

  return (
    <SeatContext.Provider value={{ seat, setSelectedSeat }}>
      {children}
    </SeatContext.Provider>
  );
}

export function useSeat() {
  const ctx = useContext(SeatContext);
  if (!ctx) throw new Error("useSeat harus dipakai di dalam SeatProvider");
  return ctx;
}
