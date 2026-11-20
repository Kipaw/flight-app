import Link from "next/link";
import SignOutButton from "@/components/signout-button";
import { getUser } from "@/lib/get-user";

const btn =
  "font-bold text-upwego-black bg-upwego-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]";

export default async function NavbarAuth() {
  const user = await getUser();
  const isCustomer = user?.role === "CUSTOMER";
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="inline-flex items-center gap-3">
      {isCustomer && (
        <Link href="/my-tickets" className={btn}>
          My Tickets
        </Link>
      )}

      {isAdmin && (
        <Link href="/dashboard" className={btn}>
          Dashboard
        </Link>
      )}

      {!user && (
        <Link href="/sign-in" className={btn}>
          Sign In
        </Link>
      )}

      {user && <SignOutButton />}
    </div>
  );
}
