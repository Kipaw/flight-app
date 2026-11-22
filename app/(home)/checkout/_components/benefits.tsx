import Image from "next/image";

const benefits = [
  {
    icon: "crown-white",
    title: "Business First",
    subtitle: "Gulfstream 109-BB",
  },
  {
    icon: "shield-tick-white",
    title: "Safe Guard",
    subtitle: "Airplane Metal X",
  },
  { icon: "building-3-white", title: "Home Pickup", subtitle: "Bentley Banta" },
];

export default function Benefits() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Additional Benefits</p>
      <div className="flex flex-col gap-[30px] md:flex-row">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="benefit-card flex items-center gap-[14px] rounded-[20px] p-[14px_20px] ring-1 ring-white"
          >
            <div className="flex h-8 w-8 shrink-0">
              <Image
                src={`/assets/images/icons/${b.icon}.svg`}
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-lg font-bold">{b.title}</p>
              <p className="text-upwego-off-purple">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
