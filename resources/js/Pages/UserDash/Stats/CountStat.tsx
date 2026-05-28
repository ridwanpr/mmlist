import {
  LuPercent,
  LuPlay,
  LuPopcorn,
  LuStar,
  LuTrash,
  LuTv,
} from "react-icons/lu";

type CountStatProps = {
  countStat: App.DTOs.CountStatData;
};

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CountStat = ({ countStat }: CountStatProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 p-3 lg:grid-cols-3 lg:gap-5 lg:p-0">
      {/* Total Anime */}
      <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
        <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
          <LuTv className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
            {formatNumber(countStat.totalAnime)}
          </p>
          <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
            Total Anime
          </p>
        </div>
      </div>

      {/* Episode Watched */}
      <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
        <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
          <LuPlay className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
            {formatNumber(countStat.episodesWatched)}
          </p>
          <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
            Episodes Watched
          </p>
        </div>
      </div>

      {/* Currently Watching */}
      <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
        <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
          <LuPopcorn className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
            {formatNumber(countStat.currentlyWatching)}
          </p>
          <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
            Currently Watching
          </p>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
        <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
          <LuPercent className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
            {countStat.completionRate}%
          </p>
          <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
            Completion Rate
          </p>
        </div>
      </div>

      {/* Drop Rate */}
      <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
        <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
          <LuTrash className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
            {countStat.dropRate}%
          </p>
          <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
            Drop Rate
          </p>
        </div>
      </div>

      {/* Average Score */}
      <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
        <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
          <LuStar className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
            {countStat.averageScore > 0
              ? countStat.averageScore.toFixed(1)
              : "0.0"}
          </p>
          <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
            Average Score
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountStat;
