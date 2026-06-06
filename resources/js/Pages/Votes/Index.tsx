import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "../UserDash/Partials/DashContainer";
import { Link } from "@inertiajs/react";
import Pagination from "../../Components/UI/Pagination";
import AppHead from "../../Components/AppHead";

type VotesProps = {
  votes: App.DTOs.PaginatedAnimeTriggerData;
};

const Votes = ({ votes }: VotesProps) => {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  return (
    <>
      <AppHead title="Votes" />
      <DashContainer>
        <div className="mt-4 mb-6 px-4 pb-4 sm:px-0 md:mt-0">
          {/* Page Header */}
          <div className="mb-4">
            <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
              Your Votes
            </h1>
            <p className="text-text-muted text-xs">
              Review your history of submitted content guide votes.
            </p>
          </div>

          {/* Votes List Container */}
          <div className="border-border bg-surface overflow-hidden rounded-xl border">
            {/* Table Header - Rebalanced Grid tracks & Right-aligned Date */}
            <div className="border-border bg-surface-alt text-text-muted hidden border-b px-6 py-2 text-xs font-semibold tracking-wider uppercase md:grid md:grid-cols-[3fr_1.5fr_0.6fr_1fr_1fr_0.9fr] md:gap-4">
              <div>Anime</div>
              <div>Content Category</div>
              <div>Present?</div>
              <div>Severity</div>
              <div>Framing</div>
              <div className="md:text-right">Voted At</div>
            </div>

            {/* List Items */}
            <div className="divide-border divide-y">
              {!votes?.data || votes.data.length === 0 ? (
                <div className="text-text-muted px-6 py-8 text-center text-sm">
                  You haven&apos;t cast any votes yet.
                </div>
              ) : (
                votes.data.map((vote) => (
                  <div
                    key={vote.id}
                    className="hover:bg-surface-alt/10 relative flex flex-col gap-1 px-4 py-3.5 text-sm transition-colors md:grid md:grid-cols-[3fr_1.5fr_0.6fr_1fr_1fr_0.9fr] md:items-center md:gap-4 md:px-6 md:py-2.5"
                  >
                    {/* Row 1 (Mobile): Anime Title (Left) & Absolute Positioned Date (Right) */}
                    <div className="min-w-0 pr-20 md:block md:truncate md:pr-0">
                      <Link
                        href={`/anime/${vote.animeData?.slug}`}
                        className="text-text hover:text-primary font-medium transition-colors hover:underline md:font-normal"
                      >
                        {vote.animeData?.title ||
                          vote.animeData?.title_english ||
                          "Unknown Anime"}
                      </Link>
                    </div>

                    {/* Row 2 (Mobile): Trigger Name gets its own full line width */}
                    <div className="text-text-muted md:text-text text-sm font-medium md:truncate md:font-normal">
                      {vote.triggerContent?.name}
                    </div>

                    {/* Row 3 (Mobile): Inline Status Stream wrapped in md:contents */}
                    <div className="text-text-muted mt-0.5 flex flex-wrap items-center gap-x-2 text-xs md:contents md:text-sm">
                      {/* Presence Status */}
                      <div
                        className={
                          vote.is_appear
                            ? "text-accent-red font-medium"
                            : "text-success font-medium md:font-normal"
                        }
                      >
                        <span className="text-text-muted md:hidden">
                          Present:{" "}
                        </span>
                        {vote.is_appear ? "Yes" : "No"}
                      </div>

                      {/* Conditional Detail Sub-Columns */}
                      {vote.is_appear ? (
                        <>
                          <span
                            className="text-text-muted/30 md:hidden"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <div className="text-text">
                            <span className="text-text-muted md:hidden">
                              Severity:{" "}
                            </span>
                            {vote.severity || "N/A"}
                          </div>

                          <span
                            className="text-text-muted/30 md:hidden"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <div className="text-text-muted">
                            <span className="text-text-muted md:hidden">
                              Framing:{" "}
                            </span>
                            {vote.framing || "Standard"}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-text-muted/30 hidden md:block">
                            -
                          </div>
                          <div className="text-text-muted/30 hidden md:block">
                            -
                          </div>
                        </>
                      )}
                    </div>

                    {/* Voted At Timestamp (Absolute on mobile, right-aligned grid text on desktop) */}
                    <div className="text-text-muted absolute top-3.5 right-4 text-[11px] whitespace-nowrap md:static md:block md:text-right md:text-xs">
                      {formatDate(vote.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Pagination links={votes?.links} />
        </div>
      </DashContainer>
    </>
  );
};

Votes.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Votes;
