import { LuCircleCheck, LuSearch, LuShieldCheck } from "react-icons/lu";

const steps = [
  {
    number: "01",
    icon: LuSearch,
    title: "Find an anime",
    description: "Search for any anime you want to watch.",
  },
  {
    number: "02",
    icon: LuShieldCheck,
    title: "Check content guide",
    description: "See community-rated content guide and their intensity.",
  },
  {
    number: "03",
    icon: LuCircleCheck,
    title: "Watch with confidence",
    description: "Make informed choices that are right for you.",
  },
];

const HowItWork = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-text mb-14 text-center font-serif text-2xl font-bold lg:text-3xl">
          How it works
        </h2>

        {/* Three panels — vertical dividers on desktop, horizontal on mobile */}
        <div className="divide-border flex flex-col divide-y md:flex-row md:divide-x md:divide-y-0">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="flex flex-1 flex-row gap-5 px-0 py-8 md:flex-col md:gap-6 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              {/* Number + icon cluster */}
              <div className="flex shrink-0 items-center gap-3 md:items-start">
                <span className="text-primary font-serif text-5xl leading-none font-bold select-none md:text-6xl">
                  {number}
                </span>
                <div className="border-border bg-surface flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                  <Icon size={18} className="text-primary" aria-hidden />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center md:justify-start">
                <h3 className="text-text text-[15px] font-semibold">{title}</h3>
                <p className="text-text-muted mt-1.5 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
