const logos = [1, 2, 3, 4, 1, 2, 3, 4];

export default function CompanyLogos() {
  return (
    <div className="company-logos flex w-full items-center overflow-hidden py-[50px]">
      <div className="slider flex w-max shrink-0">
        {[0, 1, 2].map((group) => (
          <div
            key={group}
            className="flex animate-[slide_10s_linear_infinite] items-center gap-[50px] pl-[50px]"
          >
            {logos.map((n, i) => (
              <div key={i} className="flex h-[30px] w-fit shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/images/logos/logoipsum${n}.png`}
                  alt="logo"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
