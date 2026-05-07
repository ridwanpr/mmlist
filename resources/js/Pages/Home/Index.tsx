import React from "react";
import Hero from "../../Components/Home/Hero";
import AnimeList from "../../Components/Home/AnimeList";
import FrontLayout from "../../Layouts/FrontLayout";
import Status from "../../Components/Home/Status";
import Features from "../../Components/Home/Features";
import HowItWork from "../../Components/Home/HowItWork";
import CTA from "../../Components/Home/CTA";

interface HomeProps {
  nowAiring: {
    data: App.DTOs.AnimeData[]
  };
  topAnime: {
    data: App.DTOs.AnimeData[]
  };
}

const Home = ({ nowAiring, topAnime }: HomeProps) => {
  return (
    <>
      <Hero />
      <Status />
      <AnimeList nowAiring={nowAiring} topAnime={topAnime} />
      <Features />
      <HowItWork />
      <CTA />
    </>
  );
};

Home.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Home;