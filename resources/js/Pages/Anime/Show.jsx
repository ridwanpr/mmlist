import { LuBookmark, LuChevronRight, LuShare2 } from "react-icons/lu";
import FrontLayout from "../../Layouts/FrontLayout";

const ShowAnime = () => {
  return (
    <div className="mx-auto max-w-7xl p-4 lg:pt-8 lg:pb-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm font-semibold">
        <span>Home</span>
        <LuChevronRight />
        <span>Anime</span>
        <LuChevronRight />
        <span>Attack on Titan</span>
      </div>

      {/* Anime Information */}
      <div className="grid lg:grid-cols-4">
        {/* Left Main Info */}
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
            <img
              src="/assets/img/dummy-cover.jpg"
              alt="cover anime image"
              className="mx-auto w-48 rounded-lg object-cover md:w-64"
            />
            <div>
              <h1 className="text-2xl font-bold lg:text-3xl">
                Attack on Titan
              </h1>
              <p className="text-primary mb-2 text-sm font-semibold lg:text-base">
                Shingeki no Kyojin
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="border-border bg-primary text-primary-soft rounded-lg border px-2 py-1 text-xs">
                  Movie
                </span>
                <span className="border-border text-text rounded-lg border px-2 py-1 text-xs">
                  2021
                </span>
                <span className="border-border text-text rounded-lg border px-2 py-1 text-xs">
                  Action, Drama, Fantasy
                </span>
                <span className="border-border text-text rounded-lg border px-2 py-1 text-xs">
                  4 Seasons
                </span>
                <span className="border-border text-text rounded-lg border px-2 py-1 text-xs">
                  94 Episodes
                </span>
              </div>

              <div className="mb-4 flex gap-2">
                <button
                  href="/"
                  className="bg-primary text-surface flex items-center gap-1 rounded-lg px-6 py-3 text-sm font-semibold transition hover:cursor-pointer hover:opacity-90"
                >
                  <LuBookmark size={20} />
                  Add to Watchlist
                </button>
                <button
                  href="/"
                  className="text-primary border-primary-soft flex items-center gap-1 rounded-lg border-2 px-6 py-3 text-sm font-semibold transition hover:cursor-pointer hover:opacity-90"
                >
                  <LuShare2 size={20} />
                  Share
                </button>
              </div>
              <p className="text-text/90 text-sm leading-relaxed text-pretty md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur odit ullam possimus culpa? Quam aliquam, officiis sit
                quo facere deserunt asperiores totam ad, eius ducimus, quae
                obcaecati voluptate velit impedit laborum voluptas omnis qui
                repellat! Perspiciatis voluptatibus dolor officia architecto
                ipsa dolorem perferendis, excepturi pariatur, temporibus quam
                ullam voluptas quis.
              </p>
            </div>
          </div>
        </div>
        {/* Right Info */}
        <div></div>
      </div>
    </div>
  );
};

ShowAnime.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
