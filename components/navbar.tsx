import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NavbarAuth from "./navbar-auth";

const menus = ["Flash Sale", "Discover", "Packages", "Stories", "About"];

export default function Navbar() {
  return (
    <nav
      id="Navbar"
      className="container mx-auto flex max-w-[1130px] items-center justify-between pt-[30px]"
    >
      <Link href="/" className="flex shrink-0 items-center">
        <Image
          width={120}
          height={60}
          src="/assets/images/logos/logo.svg"
          alt="logo"
        />
      </Link>

      <ul className="nav-menus flex w-fit items-center gap-[30px]">
        {menus.map((label) => (
          <li key={label}>
            <Link href="#" className="font-medium">
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Suspense fallback={<div className="h-[48px] w-[140px]" />}>
            <NavbarAuth />
          </Suspense>
        </li>
      </ul>
    </nav>
  );
}
