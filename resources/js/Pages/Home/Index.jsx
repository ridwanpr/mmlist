import Hero from "../../Components/Home/Hero";
import AnimeList from "../../Components/Home/AnimeList";
import FrontLayout from "../../Layouts/FrontLayout";
import Status from "../../Components/Home/Status";

const Home = () => {
  return (
    <>
      <Hero />
      <Status />
      <AnimeList />
    </>
  );
};

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Home;
