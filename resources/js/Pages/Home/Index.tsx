import React from "react";

import AnimeList from "./Partials/AnimeList";
import CTA from "./Partials/CTA";
import Features from "./Partials/Features";
import Hero from "./Partials/Hero";
import HowItWork from "./Partials/HowItWork";
import FrontLayout from "../../Layouts/FrontLayout";

interface HomeProps {
  nowAiring: App.DTOs.AnimeData[];
  topAnime: App.DTOs.AnimeData[];
}

const Home = ({ nowAiring, topAnime }: HomeProps) => {
  return (
    <>
      <Hero />
      <AnimeList nowAiring={nowAiring} topAnime={topAnime} />
      <Features />
      <HowItWork />
      <CTA />
    </>
  );
};

Home.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Home;
