import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/get-user";
import Sidebar from "../../../components/dashboard/sidebar";

async function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) redirect("/dashboard/signin");
  if (user.role !== "ADMIN") redirect("/");

  return (
    <section>
      <nav className="border-b border-muted p-5">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold text-primary">FlySha Dashboard</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </nav>

      <section className="flex flex-row gap-5 items-start flex-nowrap">
        <Sidebar />
        <main className="grow p-5 space-y-5">{children}</main>
      </section>
    </section>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}
