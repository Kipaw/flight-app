import Navbar from "@/components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[url('/assets/images/background/airplane.png')] bg-cover bg-left-top bg-no-repeat text-white">
      <div className="min-h-screen bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)]">
        <Navbar />
        {children}
      </div>
    </section>
  );
}
