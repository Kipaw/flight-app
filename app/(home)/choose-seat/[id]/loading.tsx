import LoadingFlightDetail from "../_components/loading-flight-detail";
import LoadingSeatList from "../_components/loading-seat-list";
import SeatShell from "../_components/seat-shell";

export default function Loading() {
  return (
    <SeatShell seats={<LoadingSeatList />} detail={<LoadingFlightDetail />} />
  );
}
