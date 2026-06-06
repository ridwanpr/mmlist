import { LuBookmark, LuSearch, LuShieldCheck, LuUsers } from "react-icons/lu";

const features = [
  {
    icon: LuSearch,
    title: "Search and Discover",
    description:
      "Find any anime and see community-rated content guide before you start.",
  },
  {
    icon: LuShieldCheck,
    title: "Detailed Content Guide",
    description:
      "See which content appear and how frequently based on real user experiences.",
  },
  {
    icon: LuUsers,
    title: "Community Driven",
    description:
      "Vote, review, and help others by sharing your experiences with this content.",
  },
  {
    icon: LuBookmark,
    title: "Save & Track",
    description:
      "Save anime to your watchlist, track your progress, and manage what you watch.",
  },
];

const Features = () => {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Split header */}
        <div className="border-border mb-0 flex flex-col gap-2 border-b pb-7 md:flex-row md:items-end md:justify-between">
          <h2 className="text-text max-w-xs font-serif text-2xl leading-snug font-bold lg:text-3xl">
            Everything you need to watch with confidence
          </h2>
          <p className="text-text-muted text-sm">
            Built by anime fans, for anime fans
          </p>
        </div>

        {/* Feature rows */}
        <div>
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="border-border flex items-start gap-5 border-b py-7 last:border-b-0"
            >
              <Icon
                size={18}
                className="text-primary mt-0.5 shrink-0"
                aria-hidden
              />

              <div className="min-w-0 flex-1 md:flex md:items-baseline md:gap-12">
                <span className="text-text block shrink-0 text-[15px] font-semibold md:w-52">
                  {title}
                </span>
                <p className="text-text mt-1 text-sm leading-relaxed md:mt-0">
                  {description}
                </p>
              </div>

              {/* Index counter, desktop only */}
              <span className="text-text-muted hidden shrink-0 font-mono text-xs tabular-nums md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
