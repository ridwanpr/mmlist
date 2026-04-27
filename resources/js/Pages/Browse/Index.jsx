import SearchSection from "../../Components/Browse/SearchSection";
import FrontLayout from "../../Layouts/FrontLayout";

const Browse = () => {
  return (
    <>
      <SearchSection />
    </>
  );
};

Browse.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default Browse;
