import Image from "next/image";
import Link from "next/link";

const linkClass =
  "font-medium transition-all duration-300 hover:font-semibold hover:text-upwego-light-purple";

const columns = [
  { title: "Explore", links: ["Services", "Testimonials", "Pricing", "About"] },
  {
    title: "Services",
    links: [
      "Pickup at Home",
      "First Lounge Plus",
      "Business Room",
      "Bentley Power",
    ],
  },
  {
    title: "About",
    links: ["Company Profile", "Our Investors", "Media Press", "Careers"],
  },
];

const contacts = [
  { icon: "call", text: "+1 2208 1996" },
  { icon: "dribbble", text: "upwego" },
  { icon: "sms", text: "team@upwego.com" },
];

export default function Footer() {
  return (
    <footer className="mt-[150px] flex flex-col justify-between border-t-[6px] border-upwego-light-purple p-[100px_10px_30px]">
      <div className="relative container mx-auto flex max-w-[1130px] justify-between">
        <Image
          src="/assets/images/icons/ellipse-4.png"
          alt=""
          width={300}
          height={300}
          className="absolute -top-[45px] -left-[20px] z-0 h-[300px] w-auto"
        />
        <div className="z-10 flex h-fit shrink-0">
          <Image
            src="/assets/images/logos/logo.svg"
            alt="Upwego"
            width={120}
            height={40}
          />
        </div>

        <div className="z-10 flex gap-[100px]">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <p className="text-lg font-bold">{col.title}</p>
              {col.links.map((label) => (
                <Link key={label} href="#" className={linkClass}>
                  {label}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-5">
            <p className="text-lg font-bold">Connect</p>
            {contacts.map((c) => (
              <Link
                key={c.icon}
                href="#"
                className={`${linkClass} flex items-center gap-[6px]`}
              >
                <Image
                  src={`/assets/images/icons/${c.icon}.svg`}
                  alt=""
                  width={20}
                  height={20}
                />
                {c.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="z-10 mx-auto mt-[60px] text-sm text-[#A0A0AC]">
        All Rights Reserved. Copyright Upwego 2026.
      </p>
    </footer>
  );
}
