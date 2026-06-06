import { Link } from "@inertiajs/react";
import TimeAgo from "../../../Components/TimeAgo";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";

type RecentVotesProps = {
  latestVotes: App.DTOs.AnimeTriggerData[];
};

const RecentVotes = ({ latestVotes }: RecentVotesProps) => {

  const getSeverityClass = (severity: string | null | undefined): string => {
    if (!severity) return "text-severity-unverified";

    switch (severity.toLowerCase()) {
      case "mild":
        return "text-severity-mild";
      case "moderate":
        return "text-severity-moderate";
      case "high":
        return "text-severity-high";
      case "severe":
      case "critical":
        return "text-severity-severe";
      default:
        return "text-severity-unverified";
    }
  };

  return (
    <div className="mb-6">
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">
          Recent Votes
        </h2>
        <div className="bg-surface border-border mt-4 overflow-hidden rounded-xl border shadow-xs">
          {/* Desktop Table Header */}
          <div className="border-border bg-surface-alt text-text-muted hidden border-b px-6 py-3 text-xs font-semibold tracking-wider uppercase md:grid md:grid-cols-[2.5fr_1.5fr_0.7fr_1fr_1.2fr_1fr_0.8fr] md:gap-4">
            <div>Anime</div>
            <div>Content</div>
            <div>Present?</div>
            <div>Severity</div>
            <div>Framing</div>
            <div>Voted By</div>
            <div className="md:text-right">Voted At</div>
          </div>

          {/* Table Body */}
          <div className="divide-border divide-y">
            {/* Vote Entry */}
            {latestVotes &&
              latestVotes.map((votes) => (
                <div
                  key={votes.id}
                  className="grid grid-cols-1 items-center gap-2 p-5 text-sm md:grid-cols-[2.5fr_1.5fr_0.7fr_1fr_1.2fr_1fr_0.8fr] md:gap-4 md:px-6 md:py-4"
                >
                  <Link
                    href={show.url({ slug: votes.animeData!.slug })}
                    className="text-primary font-serif text-base font-bold hover:underline md:font-sans md:text-sm md:font-semibold"
                  >
                    {votes.animeData?.title_english || votes.animeData?.title}
                  </Link>
                  <div className="text-text-muted md:text-text">
                    <span className="text-text-muted mr-1 font-medium md:hidden">
                      Category:
                    </span>
                    {votes.triggerContent?.name}
                  </div>
                  <div className="text-text">
                    <span className="text-text-muted mr-1 font-medium md:hidden">
                      Present?:
                    </span>
                    <span className="font-medium">
                      {votes.is_appear ? (
                        <span className="text-accent-red">Yes</span>
                      ) : (
                        <span className="text-success">No</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted mr-1 font-medium md:hidden">
                      Severity:
                    </span>
                    <span
                      className={`font-bold ${getSeverityClass(votes.severity)}`}
                    >
                      {votes.severity ?? "-"}
                    </span>
                  </div>
                  <div className="text-text-muted">
                    <span className="text-text-muted mr-1 font-medium md:hidden">
                      Framing:
                    </span>
                    {votes.framing ?? "-"}
                  </div>
                  <div className="text-text">
                    <span className="text-text-muted mr-1 font-medium md:hidden">
                      Voted By:
                    </span>
                    {votes.userData?.name}
                  </div>
                  <div className="text-text-muted text-xs md:text-right">
                    <span className="text-text-muted mr-1 font-medium md:hidden">
                      Voted At:
                    </span>
                    <TimeAgo dateString={votes.created_at!} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentVotes;
