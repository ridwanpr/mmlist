import {
  LuBookmark,
  LuChevronRight,
  LuShare2,
  LuStar,
  LuStarHalf,
} from "react-icons/lu";
import FrontLayout from "../../Layouts/FrontLayout";
import TriggerWarningSection from "../../Components/Anime/TriggerWarningSection";

const ShowAnime = () => {
  const triggerData = [
    { name: "Death", level: 5, label: "Overwhelming" },
    { name: "Graphic Gore", level: 4, label: "Distressing" },
    { name: "Self-Harm", level: 3, label: "Notable" },
    { name: "Sexual Assault", level: 2, label: "Barely Noticeable" },
    { name: "NTR / Cheating", level: 1, label: "None" },
  ];

  const getColorTheme = (level) => {
    switch (level) {
      case 1:
        return { bg: "bg-emerald-500", text: "text-emerald-500" };
      case 2:
        return { bg: "bg-yellow-500", text: "text-yellow-500" };
      case 3:
        return { bg: "bg-amber-500", text: "text-amber-500" };
      case 4:
        return { bg: "bg-orange-500", text: "text-orange-500" };
      case 5:
        return { bg: "bg-red-600", text: "text-red-600" };
      default:
        return { bg: "bg-text-muted", text: "text-text-muted" };
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 lg:pt-6 lg:pb-6">
      {/* Breadcrumb */}
      <div className="text-text-muted mb-4 flex items-center gap-2 text-sm font-semibold">
        <span className="hover:text-primary cursor-pointer transition-colors">
          Home
        </span>
        <LuChevronRight size={16} />
        <span className="hover:text-primary cursor-pointer transition-colors">
          Anime
        </span>
        <LuChevronRight size={16} />
        <span className="text-text">Attack on Titan</span>
      </div>

      {/* Anime Information */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left Main Info */}
        <div className="min-w-0 lg:col-span-3">
          <div className="flex flex-col gap-5 md:flex-row">
            {/* Cover Image */}
            <div className="shrink-0">
              <img
                src="/assets/img/dummy-cover.jpg"
                alt="cover anime image"
                className="mx-auto w-40 rounded-lg object-cover shadow-sm md:w-56"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h1 className="text-text text-2xl leading-tight font-bold lg:text-3xl">
                Attack on Titan
              </h1>
              <p className="text-primary mb-1.5 text-sm font-semibold lg:text-base">
                Shingeki no Kyojin
              </p>

              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                <span className="border-border bg-primary text-primary-soft rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase">
                  Movie
                </span>
                <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                  2021
                </span>
                <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                  Action, Drama, Fantasy
                </span>
                <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                  4 Seasons
                </span>
                <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                  94 Episodes
                </span>
              </div>

              <div className="mb-5 flex gap-2.5">
                <button className="bg-primary text-surface flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95">
                  <LuBookmark size={18} />
                  Add to Watchlist
                </button>
                <button className="text-primary border-primary-soft hover:bg-surface-alt flex items-center gap-1.5 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition active:scale-95">
                  <LuShare2 size={18} />
                  Share
                </button>
              </div>

              {/* Synopsis */}
              <p className="text-text/90 mb-5 text-sm leading-relaxed text-pretty md:text-[15px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur odit ullam possimus culpa? Quam aliquam, officiis sit
                quo facere deserunt asperiores totam ad, eius ducimus, quae
                obcaecati voluptate velit impedit laborum voluptas omnis qui
                repellat! Perspiciatis voluptatibus dolor officia architecto
                ipsa dolorem perferendis, excepturi pariatur, temporibus quam
                ullam voluptas quis.
              </p>

              {/* Metadata */}
              <div className="border-border grid grid-cols-2 gap-y-4 border-y py-4 sm:grid-cols-4 sm:gap-x-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-muted text-[11px] font-bold tracking-wider uppercase">
                    Studio
                  </span>
                  <span className="text-text/90 text-sm font-semibold">
                    WIT Studio
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-muted text-[11px] font-bold tracking-wider uppercase">
                    Status
                  </span>
                  <span className="text-text/90 text-sm font-semibold">
                    Completed
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-muted text-[11px] font-bold tracking-wider uppercase">
                    Source
                  </span>
                  <span className="text-text/90 text-sm font-semibold">
                    Manga
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-muted text-[11px] font-bold tracking-wider uppercase">
                    Air Date
                  </span>
                  <span className="text-text/90 text-sm font-semibold">
                    Apr 2013 - Nov 2023
                  </span>
                </div>
              </div>
            </div>
          </div>
          <TriggerWarningSection />
        </div>

        {/* Right Info */}
        <div className="min-w-0 lg:col-span-1">
          {/* Community Rating */}
          <div className="border-border bg-surface mb-4 rounded-lg border p-4">
            <p className="mb-2 font-semibold">Community Rating</p>
            <div className="mb-1 flex items-center gap-2">
              <p className="mb-2 text-2xl font-semibold md:text-3xl">4.6</p>
              <LuStar size={22} className="fill-accent-gold text-accent-gold" />
              <LuStar size={22} className="fill-accent-gold text-accent-gold" />
              <LuStar size={22} className="fill-accent-gold text-accent-gold" />
              <LuStar size={22} className="fill-accent-gold text-accent-gold" />
              <LuStarHalf
                size={22}
                className="fill-accent-gold text-accent-gold"
              />
            </div>
            <p className="mb-2 text-sm">based on 2,842 votes</p>
            <p className="text-text/90 text-sm font-bold">What is this?</p>
            <p className="text-text/90 mb-2 text-sm">
              Our community reviews how frequent or intense each trigger
              appears.
            </p>
          </div>

          {/* At a Glance */}
          <div className="border-border bg-surface mb-4 rounded-lg border p-4">
            <div className="mb-4">
              <p className="text-text font-semibold">At a Glance</p>
            </div>

            <div className="flex flex-col gap-3">
              {triggerData.map((trigger, idx) => {
                const theme = getColorTheme(trigger.level);
                return (
                  <div
                    key={idx}
                    className="border-border/50 flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-text/90 text-sm font-medium">
                      {trigger.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${theme.bg}`}
                      ></span>
                      <span
                        className={`text-[11px] font-bold tracking-wider uppercase ${theme.text}`}
                      >
                        {trigger.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShowAnime.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
