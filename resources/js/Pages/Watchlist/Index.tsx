import type React from "react";
import DashContainer from "../../Components/UserDash/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";

const Watchlist = () => {
  return (
    <DashContainer>
      <div className="mb-6">
        <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
          Watchlist
        </h1>
        <p className="text-text-muted text-sm">27 titles</p>
      </div>
      <div
        id="watchlist-tab"
        className="border-border flex gap-4 border-b pb-2"
      >
        <div className="border-primary -mb-2 flex items-center gap-1 border-b px-4 pb-2.5">
          <p className="text-text text-sm leading-relaxed tracking-wide">
            Watching
          </p>
          <span className="text-text-muted text-xs">8</span>
        </div>
        <div className="-mb-2 flex items-center gap-1 px-4 pb-2.5">
          <p className="text-text-muted text-sm leading-relaxed tracking-wide">
            Completed
          </p>
          <span className="text-text-muted text-xs">124</span>
        </div>
        <div className="-mb-2 flex items-center gap-1 px-4 pb-2.5">
          <p className="text-text-muted text-sm leading-relaxed tracking-wide">
            Plan to Watch
          </p>
          <span className="text-text-muted text-xs">7</span>
        </div>
        <div className="-mb-2 flex items-center gap-1 px-4 pb-2.5">
          <p className="text-text-muted text-sm leading-relaxed tracking-wide">
            On Hold
          </p>
          <span className="text-text-muted text-xs">2</span>
        </div>
        <div className="-mb-2 flex items-center gap-1 px-4 pb-2.5">
          <p className="text-text-muted text-sm leading-relaxed tracking-wide">
            Dropped
          </p>
          <span className="text-text-muted text-xs">4</span>
        </div>
      </div>
    </DashContainer>
  );
};

Watchlist.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Watchlist;
