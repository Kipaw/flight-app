import Image from "next/image";

const items = [
  { image: "thumbnail1.png", title: "First Lounge", subtitle: "Manhanggattan" },
  {
    image: "thumbnail2.png",
    title: "Business First",
    subtitle: "Gulfstream 109-BB",
  },
  {
    image: "thumbnail3.png",
    title: "Pickup at Home",
    subtitle: "Bentley Banta",
  },
  { image: "thumbnail4.png", title: "Fly Roam", subtitle: "Capung A19-22" },
];

export default function Selected() {
  return (
    <section
      id="Selected"
      className="container mx-auto flex max-w-[1130px] flex-col gap-[30px] px-4 pt-[100px]"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-center text-[32px] leading-[48px] font-bold">
          Best Selective
        </h2>
        <div className="flex gap-[10px]">
          <button
            type="button"
            aria-label="Previous"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white"
          >
            <Image
              src="/assets/images/icons/arrow-right.svg"
              alt=""
              width={20}
              height={20}
              className="rotate-180"
            />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white"
          >
            <Image
              src="/assets/images/icons/arrow-right.svg"
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[30px]">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-5">
            <div className="relative h-[310px] overflow-hidden rounded-[30px]">
              <Image
                src={`/assets/images/thumbnail/${item.image}`}
                alt={item.title}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-[14px]">
              <Image
                src="/assets/images/icons/crown-white.svg"
                alt=""
                width={32}
                height={32}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-upwego-off-purple">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
