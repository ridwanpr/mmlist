import { Link } from "@inertiajs/react";

const AnimeCard = ({ animeData }) => {
  // console.log(animeData.images.jpg.image_url);
  return (
    <Link href="/anime/show" className="group mb-4 block lg:mb-0">
      <div className="bg-surface border-surface-alt group-hover:border-primary-soft flex h-40 overflow-hidden rounded-lg border transition duration-200 group-hover:shadow-sm">
        {/* Image Wrapper */}
        <div className="relative h-full w-26.5 shrink-0 overflow-hidden">
          <img
            src={animeData && animeData.images.jpg.image_url}
            alt={animeData && `${animeData.title} cover image`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-1 flex-col overflow-hidden p-3">
          {/* Title */}
          <p
            className="mb-1 line-clamp-2 text-sm leading-snug font-bold md:text-base"
            title="Anime Title Here Lorem ipsum dolor sit amet."
          >
            {animeData && animeData.title}
          </p>

          {/* Combined Meta Info */}
          <p className="text-text/80 mb-1 truncate text-xs">
            {animeData && (animeData.year ? `${animeData.year} |` : "")}{" "}
            {animeData &&
              (animeData.episodes
                ? `${animeData.episodes} episodes |`
                : "")}{" "}
            {animeData && (animeData.type ?? "")}
          </p>

          {/* Genres */}
          <div className="text-text/80 mb-2 truncate text-xs">
            {animeData && animeData.genres
              ? animeData.genres.map((genre) => `${genre.name} `)
              : ""}
          </div>

          {/* Tags */}
          <div className="mt-auto flex flex-wrap gap-1 overflow-hidden">
            <span className="border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Trigger
            </span>
            <span className="border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              Trigger
            </span>
            <span className="border-primary-soft text-text w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium">
              +3
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
