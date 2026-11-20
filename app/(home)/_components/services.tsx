import Image from "next/image";

const description = "Our jets protected by metal that can’t be destroyed.";

const services = [
  { icon: "profile-2user", title: "Talented Crew" },
  { icon: "shield-tick", title: "Safe Guard" },
  { icon: "crown", title: "Best Awards" },
  { icon: "building-3", title: "Pickup at Home" },
];

export default function Services() {
  return (
    <section
      id="Services"
      className="container mx-auto flex max-w-[1130px] flex-col gap-[30px] px-4 pt-[100px]"
    >
      <h2 className="text-center text-[32px] leading-[48px] font-bold">
        We Ensure You <br />
        Fly With Us Forever
      </h2>
      <div className="flex justify-between">
        {services.map((s) => (
          <div key={s.title} className="flex w-[220px] flex-col gap-[30px]">
            <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-upwego-light-purple">
              <Image
                src={`/assets/images/icons/${s.icon}.svg`}
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-2xl leading-[36px] font-bold">{s.title}</p>
              <p className="leading-[30px] text-upwego-off-purple">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
