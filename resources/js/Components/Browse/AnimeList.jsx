import React from "react";
import AnimeCard from "../UI/AnimeCard";

const AnimeList = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl p-4 lg:pt-4">
        <p className="mb-4 font-semibold">1,248 anime found</p>
        <div className="lg:flex lg:gap-4">
          <div className="bg-background hidden self-start rounded-lg p-4 lg:flex lg:flex-1"></div>
          <div className="lg:flex-3">
            <div className="gap-4 md:grid md:grid-cols-2">
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
