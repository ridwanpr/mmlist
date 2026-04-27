import { Link } from "@inertiajs/react";
import { LuChevronRight, LuFlame, LuRadio, LuSkull } from "react-icons/lu";
import AnimeCard from "../UI/AnimeCard";
import SectionHeader from "./SectionHeader";

const AnimeList = () => {
  return (
    <div className="p-4 lg:py-8">
      <SectionHeader
        title="Now Airing"
        icon={<LuRadio size="32px" className="text-primary" />}
      />

      <section id="now-airing" className="mb-8">
        <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
        </div>
      </section>

      <SectionHeader
        title="Hot Anime"
        icon={<LuFlame size="32px" className="text-primary" />}
      />

      <section id="hot" className="mb-4">
        <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
          <AnimeCard />
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
