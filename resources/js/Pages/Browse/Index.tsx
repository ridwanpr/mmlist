import type React from 'react';

import FrontLayout from '../../Layouts/FrontLayout';
import SearchSection from './Partials/SearchSection';
import AnimeList from './Partials/AnimeList';
import AppHead from '../../Components/AppHead';

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
    from_airing: string;
    to_airing: string;
    season: string;
    type: string;
    rating: string;
    genres_include: string;
    genres_exclude: string;
    themes_include: string;
    themes_exclude: string;
  };
}

const Browse = ({ animes, genres, themes, year, type, season, rating, filters }: BrowseProps) => {
  return (
    <>
      <AppHead
        title="Browse Anime"
        meta="Browse our comprehensive anime database. Filter series by specific trigger warnings, search for content flags, and find safe shows to add to your list."
      />
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
    </>
  );
};

Browse.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
