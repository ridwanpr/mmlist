import DashContainer from "../../Components/UserDash/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";

const Watchlist = () => {
  return (
    <DashContainer>
      <h1>Watchlist</h1>
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
