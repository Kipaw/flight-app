import Link from "next/link";
import { getUser } from "@/lib/get-user";
import SignOutButton from "./signout-button";

const btn =
  "font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]";

export default async function NavbarAuth() {
  const user = await getUser();
  const isCustomer = user?.role === "CUSTOMER";

  return (
    <div className="inline-flex items-center gap-3">
      {isCustomer ? (
        <Link href="/my-tickets" className={btn}>
          My Tickets
        </Link>
      ) : (
        <Link href="/dashboard/signin" className={btn}>
          Sign In
        </Link>
      )}

      {isCustomer && <SignOutButton />}
    </div>
  );
}
