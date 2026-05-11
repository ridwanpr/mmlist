import { LuFlame, LuRadio } from "react-icons/lu";

import AnimeCard from "../UI/AnimeCard";
import SectionHeader from "./SectionHeader";

interface AnimeListProps {
  nowAiring: App.DTOs.AnimeData[];
  topAnime: App.DTOs.AnimeData[];
}

const AnimeList = ({ nowAiring, topAnime }: AnimeListProps) => {
  return (
    <div className="mx-auto max-w-7xl p-4 lg:py-8">
      <SectionHeader
        title="Now Airing"
        icon={<LuRadio size="32px" className="text-primary" />}
      />

      <section id="now-airing" className="mb-8">
        <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {nowAiring &&
            nowAiring.map((airing) => (
              <AnimeCard key={airing.mal_id} animeData={airing} />
            ))}
        </div>
      </section>

      <SectionHeader
        title="Top Anime"
        icon={<LuFlame size="32px" className="text-primary" />}
      />

      <section id="top" className="mb-4">
        <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {topAnime &&
            topAnime.map((top) => (
              <AnimeCard key={top.mal_id} animeData={top} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
