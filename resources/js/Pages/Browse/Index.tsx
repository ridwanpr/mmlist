import type React from "react";

import AnimeList from "../../Components/Browse/AnimeList";
import SearchSection from "../../Components/Browse/SearchSection";
import FrontLayout from "../../Layouts/FrontLayout";

interface BrowseProps {
  animes: App.DTOs.PaginatedAnimeData;
  genres: App.DTOs.GenreData[];
  themes: App.DTOs.ThemeData[];
  year: number[];
  type: string[];
  season: string[];
  filters: {
    query: string;
    genres: number[];
    themes: number[];
    years: number[];
    seasons: string[];
    types: string[];
  };
}

const Browse = ({
  animes,
  genres,
  themes,
  year,
  type,
  season,
  filters,
}: BrowseProps) => {
  return (
    <div className="mb-8">
      <SearchSection
        genres={genres}
        themes={themes}
        year={year}
        type={type}
        season={season}
        filters={filters}
      />
      <AnimeList animes={animes} />
    </div>
  );
};

Browse.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
