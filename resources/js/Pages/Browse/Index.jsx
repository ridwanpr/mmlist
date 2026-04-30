import AnimeList from "../../Components/Browse/AnimeList";
import SearchSection from "../../Components/Browse/SearchSection";
import FrontLayout from "../../Layouts/FrontLayout";

const Browse = () => {
  return (
    <div className="mb-8">
      <SearchSection />
      <AnimeList />
    </div>
  );
};

Browse.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
