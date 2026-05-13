import React from "react";

import AnimeList from "../../Components/Home/AnimeList";
import CTA from "../../Components/Home/CTA";
import Features from "../../Components/Home/Features";
import Hero from "../../Components/Home/Hero";
import HowItWork from "../../Components/Home/HowItWork";
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
