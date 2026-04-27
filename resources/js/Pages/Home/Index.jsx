import Hero from "../../Components/Home/Hero";
import AnimeList from "../../Components/Home/AnimeList";
import FrontLayout from "../../Layouts/FrontLayout";
import Status from "../../Components/Home/Status";
import Features from "../../Components/Home/Features";
import HowItWork from "../../Components/Home/HowItWork";
import CTA from "../../Components/Home/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <Status />
      <AnimeList />
      <Features />
      <HowItWork />
      <CTA />
    </>
  );
};

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Home;
