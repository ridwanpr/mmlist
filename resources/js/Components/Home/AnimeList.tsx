import { Link } from "@inertiajs/react";
import { LuChevronRight, LuFlame, LuRadio, LuSkull } from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import AnimeCard from "../UI/AnimeCard";

interface AnimeListProps {
  nowAiring: {
    data: App.DTOs.AnimeData[]
  };
  topAnime: {
    data: App.DTOs.AnimeData[]
  };
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
            nowAiring.data.map((airing) => (
              <AnimeCard key={airing.malId} animeData={airing} />
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
            topAnime.data.map((top) => (
              <AnimeCard key={top.malId} animeData={top} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
