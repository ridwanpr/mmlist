import { LuAward, LuFilm } from 'react-icons/lu';
import { index as browseIndex } from '../../../actions/App/Http/Controllers/BrowseController';

import AnimeCard from '../../../Components/AnimeCard';
import SectionHeader from './SectionHeader';

interface AnimeListProps {
  nowAiring: App.DTOs.AnimeData[];
  topAnime: App.DTOs.AnimeData[];
}

const AnimeList = ({ nowAiring, topAnime }: AnimeListProps) => {
  return (
    <div className="mx-auto max-w-7xl p-4 lg:py-8">
      <SectionHeader
        href={browseIndex.url({ query: { airing: 'true' } })}
        title="Now Airing"
        icon={<LuFilm size="22px" />}
      />

      <section id="now-airing" className="mb-12">
        <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {nowAiring &&
            nowAiring.map((airing, index) => (
              <AnimeCard key={airing.mal_id} animeData={airing} index={index} />
            ))}
        </div>
      </section>

      <SectionHeader
        href={browseIndex.url({ query: { sort: 'score', order: 'desc' } })}
        title="Popular Anime"
        icon={<LuAward size="22px" />}
      />

      <section id="top" className="mb-4">
        <div className="gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {topAnime &&
            topAnime.map((top, index) => (
              <AnimeCard key={top.mal_id} animeData={top} index={index} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default AnimeList;
