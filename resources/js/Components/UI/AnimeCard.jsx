import { Link } from "@inertiajs/react";

const AnimeCard = () => {
  return (
    <Link href="#">
      <div className="bg-surface border-surface-alt mb-4 flex h-40 overflow-hidden rounded-lg border lg:mb-0">
        <div className="relative h-full shrink-0">
          <img
            src="/assets/img/dummy-cover.jpg"
            alt="image"
            className="aspect-2/3 h-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden p-3">
          <p
            className="mb-2 line-clamp-2 leading-tight font-bold"
            title="Anime Title Here Lorem ipsum dolor sit amet."
          >
            Anime Title Here Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, eaque.
          </p>
          <p className="mb-2 text-xs">2021</p>
          <p className="mb-2 text-xs">12 Episodes <span>- Movie</span></p>

          <div className="mb-2 flex flex-wrap gap-1">
            <span className="truncate text-xs">
              Action, Adventure, Drama
            </span>
          </div>
          <div className="flex flex-wrap gap-1 overflow-hidden">
            <span className="border-primary-soft w-fit rounded-full border px-1 py-0.5 text-xs">
              Trigger
            </span>
            <span className="border-primary-soft w-fit rounded-full border px-1 py-0.5 text-xs">
              Trigger
            </span>
            <span className="border-primary-soft w-fit rounded-full border px-1 py-0.5 text-xs">
              +3
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
