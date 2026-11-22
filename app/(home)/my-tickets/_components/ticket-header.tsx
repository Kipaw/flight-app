import Navbar from "@/components/navbar";

export default function TicketHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="Header"
      className="relative h-[290px] bg-[url('/assets/images/background/airplane.png')] bg-cover bg-left-top bg-no-repeat"
    >
      <div className="Header-content h-[290px] bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)]">
        <Navbar />
        {children}
        <div className="absolute bottom-0 h-[15px] w-full bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)]" />
      </div>
    </section>
  );
}
