import type React from "react";

import AnimeList from "../../Components/Browse/AnimeList";
import SearchSection from "../../Components/Browse/SearchSection";
import FrontLayout from "../../Layouts/FrontLayout";

interface BrowseProps {
  animes: App.DTOs.PaginatedAnimeData;
}

const Browse = ({ animes }: BrowseProps) => {
  return (
    <div className="mb-8">
      <SearchSection />
      <AnimeList animes={animes} />
    </div>
  );
};

Browse.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
