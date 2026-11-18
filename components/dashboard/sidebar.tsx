import Link from "next/link";
import {
  Plane,
  Ticket,
  Users,
  ReceiptText,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SignOutButton from "../../app/dashboard/(home)/_components/signout-button";

type Item = { href: string; label: string; icon: React.ElementType };

const main: Item[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const masterData: Item[] = [
  { href: "/dashboard/airplanes", label: "Airplanes", icon: Plane },
  { href: "/dashboard/flights", label: "Flights", icon: Ticket },
];

const transactions: Item[] = [
  { href: "/dashboard/tickets", label: "Tickets", icon: ReceiptText },
  { href: "/dashboard/users", label: "Users", icon: Users },
];

function NavGroup({ title, items }: { title?: string; items: Item[] }) {
  return (
    <div className="space-y-2">
      {title && <div className="uppercase text-xs font-bold">{title}</div>}
      {items.map(({ href, label, icon: Icon }) => (
        <Button
          key={href}
          variant="ghost"
          asChild
          className="w-full justify-start"
        >
          <Link href={href}>
            <Icon className="mr-2 w-4 h-4" />
            {label}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="grow-0 w-[20%] min-h-[calc(100vh-73px)] shadow p-5 flex flex-col justify-between">
      <div className="space-y-5">
        <NavGroup items={main} />
        <NavGroup title="Master Data" items={masterData} />
        <NavGroup title="Transaksi" items={transactions} />
      </div>
      <SignOutButton />
    </aside>
  );
}
