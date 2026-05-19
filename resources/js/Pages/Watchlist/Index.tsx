import FrontLayout from "../../Layouts/FrontLayout";

const Watchlist = () => {
  return (
    <div>
      <h1>Watchlist</h1>
    </div>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
