type WatchlistTabProps = {
  activeTab: string;
  handleChangeTab: (tab: string) => void;
  tabCounts: {
    watching: number;
    completed: number;
    planned: number;
    on_hold: number;
    dropped: number;
  };
};

const WatchlistTab = ({
  activeTab,
  handleChangeTab,
  tabCounts,
}: WatchlistTabProps) => {
  return (
    <div
      id="watchlist-tab"
      className="border-border flex gap-4 overflow-x-scroll border-b pb-2 lg:overflow-hidden"
    >
      <div
        id="watching"
        onClick={() => handleChangeTab("watching")}
        className={`${activeTab === "watching" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-1 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "watching" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Watching
        </p>
        <span className="text-text-muted text-xs">{tabCounts.watching}</span>
      </div>

      <div
        id="completed"
        onClick={() => handleChangeTab("completed")}
        className={`${activeTab === "completed" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-1 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "completed" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Completed
        </p>
        <span className="text-text-muted text-xs">{tabCounts.completed}</span>
      </div>

      <div
        id="planned"
        onClick={() => handleChangeTab("planned")}
        className={`${activeTab === "planned" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-1 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "planned" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Plan to Watch
        </p>
        <span className="text-text-muted text-xs">{tabCounts.planned}</span>
      </div>

      <div
        id="on_hold"
        onClick={() => handleChangeTab("on_hold")}
        className={`${activeTab === "on_hold" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-1 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "on_hold" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          On Hold
        </p>
        <span className="text-text-muted text-xs">{tabCounts.on_hold}</span>
      </div>

      <div
        id="dropped"
        onClick={() => handleChangeTab("dropped")}
        className={`${activeTab === "dropped" ? "border-primary border-b" : ""} -mb-2 flex items-center gap-1 px-1 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "dropped" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Dropped
        </p>
        <span className="text-text-muted text-xs">{tabCounts.dropped}</span>
      </div>
    </div>
  );
};

export default WatchlistTab;
