import type React from "react";

import FrontLayout from "../../Layouts/FrontLayout";
import SearchSection from "./Partials/SearchSection";
import AnimeList from "./Partials/AnimeList";

interface BrowseProps {
  animes: App.DTOs.PaginatedAnimeData;
  genres: App.DTOs.GenreData[];
  themes: App.DTOs.ThemeData[];
  year: number[];
  type: string[];
  season: string[];
  rating: string[];
  filters: {
    query: string;
    genres: number[];
    themes: number[];
    years: number[];
    seasons: string[];
    types: string[];
    rating: string[];
  };
}

const Browse = ({
  animes,
  genres,
  themes,
  year,
  type,
  season,
  rating,
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
        rating={rating}
      />
      <AnimeList animes={animes} />
    </div>
  );
};

Browse.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
