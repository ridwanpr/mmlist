import type React from "react";
import DashContainer from "../../Components/UserDash/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";
import { useState } from "react";
import WatchlistTab from "../../Components/Watchlist/WatchlistTab";

const Watchlist = () => {
  const [activeTab, setActiveTab] = useState("watching");

  return (
    <DashContainer>
      <div className="overflow-x-scroll p-4 lg:overflow-hidden lg:p-0">
        <div className="mb-6">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Watchlist
          </h1>
          <p className="text-text-muted text-sm">27 titles</p>
        </div>

        <WatchlistTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
