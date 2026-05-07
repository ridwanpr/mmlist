import AnimeCard from "../UI/AnimeCard";
import RefineResults from "./RefineResults";

interface AnimeListProps {
  animes: {
    data: App.DTOs.AnimeData[];
  };
}

const AnimeList = ({ animes }: AnimeListProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl p-4 lg:pt-4">
        <p className="mb-4 font-semibold">1,248 anime found</p>
        <div className="lg:flex lg:gap-4">
          <RefineResults />
          <div className="lg:flex-3">
            <div className="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
              {animes &&
                animes.data.map((anime) => (
                  <AnimeCard key={anime.malId} animeData={anime} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeList;
