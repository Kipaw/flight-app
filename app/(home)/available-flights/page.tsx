import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import FilterAirline from "./_components/filter-airline";
import FilterClass from "./_components/filter-class";
import FilterFlight from "./_components/filter-flight";
import FilterForm from "./_components/filter-form";
import HeaderTitle from "./_components/header-title";
import ListFlights from "./_components/list-flights";
import LoadingFilterAirline from "./_components/loading-filter-airline";
import type { SearchParams } from "./lib/data";

export const metadata: Metadata = {
  title: "Available Flights",
};

function ListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[110px] animate-pulse rounded-[20px] bg-upwego-bg-purple"
        />
      ))}
    </div>
  );
}

export default function AvailableFlightsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <section
        id="Header"
        className="relative h-[290px] bg-[url('/assets/images/background/airplane.png')] bg-cover bg-left-top bg-no-repeat"
      >
        <div className="Header-content h-[290px] bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)]">
          <Navbar />
          <div className="title container mx-auto flex max-w-[1130px] flex-col gap-1 px-4 pt-[50px] pb-[68px]">
            <Suspense
              fallback={
                <h1 className="text-[32px] leading-[48px] font-bold">
                  Available Flights
                </h1>
              }
            >
              <HeaderTitle searchParams={searchParams} />
            </Suspense>
          </div>
          <div className="absolute bottom-0 h-[15px] w-full bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)]" />
        </div>
      </section>

      <section
        id="Content"
        className="relative z-10 container mx-auto -mt-[33px] max-w-[1130px] px-4 pb-[105px]"
      >
        <div className="flex w-full gap-6">
          <FilterForm>
            <Suspense fallback={<LoadingFilterAirline rows={3} />}>
              <FilterClass searchParams={searchParams} />
            </Suspense>
            <FilterFlight />
            <Suspense fallback={<LoadingFilterAirline />}>
              <FilterAirline searchParams={searchParams} />
            </Suspense>
          </FilterForm>

          <Suspense fallback={<ListSkeleton />}>
            <ListFlights searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
