import { Link } from "@inertiajs/react";
import { FiSearch } from "react-icons/fi";

const trending = [
  "Frieren",
  "Dungeon Meshi",
  "Perfect Blue",
  "Mob Psycho 100",
  "Serial Experiments Lain",
];

const warnings = [
  "Gore",
  "Abuse",
  "Suicide",
  "Flashing",
  "Insects",
  "Cannibalism",
];

const covers = [
  {
    title: "Perfect Blue",
    image: "https://placehold.co/320x460/e2dac8/222a23?text=Perfect+Blue",
    className: "left-2 top-16 z-10 w-[170px] -rotate-[10deg] opacity-80",
  },
  {
    title: "Frieren",
    image: "https://placehold.co/360x520/dde4cf/222a23?text=Frieren",
    className: "left-[120px] top-0 z-30 w-[230px] rotate-[3deg]",
  },
  {
    title: "Evangelion",
    image: "https://placehold.co/300x430/c9a24a/222a23?text=Eva",
    className: "right-2 top-20 z-20 w-[165px] rotate-[11deg] opacity-90",
  },
];

const Hero = () => {
  return (
    <section className="border-border bg-surface overflow-hidden border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-10">
          <div className="min-w-0">
            <h1 className="text-text max-w-2xl font-serif text-4xl leading-[0.92] font-black tracking-tighter sm:text-5xl lg:text-6xl">
              Anime trigger
              <br />
              warnings.
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-7 text-[#5f655d] sm:text-[15px]">
              Search anime and check community submitted content warnings before
              watching.
            </p>

            <form className="mt-5 max-w-xl">
              <div className="bg-surface ring-border focus-within:ring-primary/30 relative overflow-hidden rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.06)] ring-1 transition focus-within:ring-2">
                <FiSearch className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#72776d]" />

                <input
                  type="text"
                  placeholder="Search anime, studio, or trigger..."
                  className="text-text h-12 w-full bg-transparent pr-28 pl-12 text-[15px] outline-none placeholder:text-[#8b9085]"
                />

                <button
                  type="submit"
                  className="bg-primary text-surface hover:bg-primary-dark absolute top-1.5 right-1.5 h-9 rounded-lg px-4 text-sm font-semibold transition"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 text-[11px] font-bold tracking-[0.18em] text-[#73776d] uppercase">
                  Trending
                </div>

                <div className="flex flex-wrap gap-2">
                  {trending.map((item) => (
                    <Link
                      key={item}
                      href="/"
                      className="border-border bg-surface text-text hover:border-primary/20 hover:bg-primary-soft/30 hover:text-primary-dark rounded-lg border px-2.5 py-1 text-sm font-medium transition"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-[11px] font-bold tracking-[0.18em] text-[#73776d] uppercase">
                  Most reported
                </div>

                <div className="flex flex-wrap gap-2">
                  {warnings.map((item) => (
                    <Link
                      key={item}
                      href="/"
                      className="bg-surface-alt hover:bg-primary-soft/40 hover:text-text rounded-lg px-2.5 py-1 text-sm text-[#5f655d] transition"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden h-80 lg:block">
            <div className="from-primary-soft/20 to-accent-gold/10 absolute inset-0 bg-linear-to-b via-transparent blur-3xl" />

            <div className="bg-primary-soft/20 absolute top-1/2 left-1/2 h-85 w-85 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

            {covers.map((cover) => (
              <div
                key={cover.title}
                className={`bg-surface absolute overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.22)] ${cover.className}`}
              >
                <img
                  src={cover.image}
                  alt={cover.title}
                  className="aspect-2/3 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
