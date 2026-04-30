import React from "react";
import AnimeCard from "../UI/AnimeCard";
import RefineResults from "./RefineResults";

const AnimeList = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl p-4 lg:pt-4">
        <p className="mb-4 font-semibold">1,248 anime found</p>
        <div className="lg:flex lg:gap-4">
          <RefineResults />
          <div className="lg:flex-3">
            <div className="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
              <AnimeCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeList;
