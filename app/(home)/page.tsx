import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import CompanyLogos from "./_components/company-logos";
import FlightSearch from "./_components/flight-search";
import Footer from "./_components/footer";
import Selected from "./_components/selected";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials";

export const metadata: Metadata = {
  title: "Upwego - Website booking ticket",
  description: "Best flights, cheaper budget.",
};

export default function HomePage() {
  return (
    <>
      <section
        id="Header"
        className="bg-[url('/assets/images/background/airplane.png')] bg-cover bg-left-top bg-no-repeat"
      >
        <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)]">
          <Navbar />
          <div className="hero-section container mx-auto mt-[103px] flex w-full max-w-[1130px] flex-col gap-[90px] px-4">
            <div className="title flex flex-col gap-[30px]">
              <h1 className="text-[80px] leading-[90px] font-extrabold">
                Best Flights. <br />
                Cheaper Budget.
              </h1>
              <p className="text-lg leading-[36px] font-medium">
                No more long queue, get more delicious heavy meals. <br />
                Crafted by best talented people around the world.
              </p>
            </div>
            <Suspense
              fallback={<div className="h-[188px] rounded-[20px] bg-white" />}
            >
              <FlightSearch />
            </Suspense>
          </div>
          <CompanyLogos />
        </div>
      </section>

      <Services />
      <Selected />
      <Testimonials />
      <Footer />
    </>
  );
}
