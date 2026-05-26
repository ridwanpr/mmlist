import { usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AnimeCard from "../../../Components/AnimeCard";
import Pagination from "../../../Components/UI/Pagination";
import { settingIndex } from "../../../actions/App/Http/Controllers/UserDashboardController";

interface AnimeListProps {
  animes: App.DTOs.PaginatedAnimeData;
}

const AnimeList = ({ animes }: AnimeListProps) => {
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const [isNsfwRestricted, setIsNsfwRestricted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const hasNsfwParam = Array.from(searchParams.values()).includes(
        "Rx - Hentai",
      );

      if (hasNsfwParam && (!user || user.show_nsfw !== true)) {
        setIsNsfwRestricted(true);
      } else {
        setIsNsfwRestricted(false);
      }
    }
  }, [user]);

  return (
    <div className="text-text mx-auto max-w-7xl p-4 font-sans">
      {isNsfwRestricted ? (
        <div className="border-border bg-surface mx-auto my-6 max-w-md rounded-md border p-6 text-center">
          <h3 className="text-text mb-1 text-lg font-bold">
            NSFW Content Filter Active
          </h3>

          <p className="text-text-muted mb-4 text-sm">
            {!user
              ? "You must have an account and enable the NSFW setting to view this rating."
              : "You need to update your preference to view content with this rating."}
          </p>

          {!user ? (
            <div className="flex justify-center gap-3">
              <Link
                href="/login"
                className="bg-primary hover:bg-primary-dark rounded px-4 py-2 text-sm font-semibold text-surface transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-surface-alt text-text border-border rounded border px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <Link
              href={settingIndex.url()}
              className="bg-primary hover:bg-primary-dark text-surface inline-block rounded px-4 py-2 text-sm font-semibold transition-colors"
            >
              Open Settings
            </Link>
          )}
        </div>
      ) : (
        <>
          <p className="text-text mb-4 font-semibold">
            {animes.total.toString()} anime found
          </p>
          <div className="lg:flex lg:gap-4">
            <div className="w-full">
              <div className="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {animes?.data &&
                  animes.data.map((anime, index) => (
                    <AnimeCard
                      key={anime.mal_id}
                      animeData={anime}
                      index={index}
                    />
                  ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Pagination links={animes.links} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeList;
