import AnimeList from "../../Components/Browse/AnimeList";
import SearchSection from "../../Components/Browse/SearchSection";
import FrontLayout from "../../Layouts/FrontLayout";

const Browse = () => {
  return (
    <>
      <SearchSection />
      <AnimeList />
    </>
  );
};

Browse.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
