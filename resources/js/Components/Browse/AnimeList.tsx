import AnimeCard from "../UI/AnimeCard";
import Pagination from "../UI/Pagination";

interface AnimeListProps {
  animes: App.DTOs.PaginatedAnimeData;
}

const AnimeList = ({ animes }: AnimeListProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl p-4 lg:pt-4">
        <p className="mb-4 font-semibold">
          {animes.total.toLocaleString()} anime found
        </p>
        <div className="lg:flex lg:gap-4">
          <div className="lg:flex-3">
            <div className="gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
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
      </div>
    </>
  );
};

export default AnimeList;
