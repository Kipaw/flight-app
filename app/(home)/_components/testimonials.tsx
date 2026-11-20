import Image from "next/image";

const testimonial = {
  review:
    "I thought cheaper was not good, well, I personally never had this amazing experience. Thank you!!",
  name: "Jessi Lyio",
  role: "CPO Agolia Modd",
};

export default function Testimonials() {
  return (
    <section
      id="Testimonials"
      className="flex w-full flex-col gap-[30px] pt-[100px]"
    >
      <div className="flex flex-col items-center gap-[6px]">
        <h2 className="text-center text-[32px] leading-[48px] font-bold">
          Best Selective
        </h2>
        <p className="font-medium text-upwego-off-purple">
          We gave them all the best experiences ever
        </p>
      </div>

      <div className="testimonial-slider w-full overflow-hidden">
        <div className="slider flex w-max shrink-0">
          {[0, 1, 2].map((group) => (
            <div
              key={group}
              className="flex h-[228px] animate-[slide_15s_linear_infinite] items-center gap-[30px] pl-[30px]"
            >
              {[0, 1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="testi-cards flex h-full w-fit flex-col gap-[14px] overflow-hidden rounded-[20px] bg-upwego-bg-purple p-5"
                >
                  <p className="review h-[90px] w-[305px] leading-[30px]">
                    {testimonial.review}
                  </p>
                  <div className="flex">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Image
                        key={s}
                        src="/assets/images/icons/star-icon.svg"
                        alt="star"
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="/assets/images/photos/group-47.png"
                        alt={testimonial.name}
                        fill
                        sizes="50px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-upwego-off-purple">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
