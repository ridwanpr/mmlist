import Hero from "../../Components/Home/Hero";
import AnimeList from "../../Components/Home/AnimeList";
import FrontLayout from "../../Layouts/FrontLayout";
import Status from "../../Components/Home/Status";
import Features from "../../Components/Home/Features";

const Home = () => {
  return (
    <>
      <Hero />
      <Status />
      <AnimeList />
      <Features />
    </>
  );
};

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Home;
