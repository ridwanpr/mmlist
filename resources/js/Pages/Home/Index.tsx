import React from "react";

import AnimeList from "./Partials/AnimeList";
import Hero from "./Partials/Hero";
import FrontLayout from "../../Layouts/FrontLayout";
import AppHead from "../../Components/AppHead";
import RecentVotes from "./Partials/RecentVotes";
import RecentComment from "./Partials/RecentComment";

interface HomeProps {
  nowAiring: App.DTOs.AnimeData[];
  topAnime: App.DTOs.AnimeData[];
  staffPick: App.DTOs.AnimeData[];
}

const Home = ({ nowAiring, topAnime, staffPick }: HomeProps) => {
  return (
    <>
      <AppHead
        title="Track Anime Trigger Warnings & Watchlists"
        meta="Welcome to Mamorulist, the community-driven anime trigger warning database. Search safety flags, check content warnings, and manage your watchlist."
      />
      <Hero staffPick={staffPick} />
      <AnimeList nowAiring={nowAiring} topAnime={topAnime} />
      <RecentComment />
      <RecentVotes />
    </>
  );
};

Home.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Home;
