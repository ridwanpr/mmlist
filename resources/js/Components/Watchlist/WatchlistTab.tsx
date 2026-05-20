import type { SetStateAction } from "react";
import type React from "react";

type WatchlistTabProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
};

const WatchlistTab = ({ activeTab, setActiveTab }: WatchlistTabProps) => {
  return (
    <div id="watchlist-tab" className="border-border flex gap-4 border-b pb-2">
      <div
        id="watching"
        onClick={() => setActiveTab("watching")}
        className={`${activeTab === "watching" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-4 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "watching" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Watching
        </p>
        <span className="text-text-muted text-xs">8</span>
      </div>
      <div
        id="completed"
        onClick={() => setActiveTab("completed")}
        className={`${activeTab === "completed" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-4 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "completed" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Completed
        </p>
        <span className="text-text-muted text-xs">124</span>
      </div>
      <div
        id="planned"
        onClick={() => setActiveTab("planned")}
        className={`${activeTab === "planned" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-4 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "planned" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Plan to Watch
        </p>
        <span className="text-text-muted text-xs">7</span>
      </div>
      <div
        id="on_hold"
        onClick={() => setActiveTab("on_hold")}
        className={`${activeTab === "on_hold" ? "border-primary border-b" : ""} -mb-2 flex shrink-0 items-center gap-1 px-4 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "on_hold" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          On Hold
        </p>
        <span className="text-text-muted text-xs">2</span>
      </div>
      <div
        id="dropped"
        onClick={() => setActiveTab("dropped")}
        className={`${activeTab === "dropped" ? "border-primary border-b" : ""} -mb-2 flex items-center gap-1 px-4 pb-2.5 hover:cursor-pointer`}
      >
        <p
          className={`${activeTab === "dropped" ? "text-text" : "text-text-muted"} text-sm leading-relaxed tracking-wide`}
        >
          Dropped
        </p>
        <span className="text-text-muted text-xs">4</span>
      </div>
    </div>
  );
};

export default WatchlistTab;
