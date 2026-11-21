import SeatProvider from "./providers/seat-provider";

export default function ChooseSeatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeatProvider>{children}</SeatProvider>;
}
