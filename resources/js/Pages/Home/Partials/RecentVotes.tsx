const RecentVotes = () => {
  return (
    <div className="mb-8">
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">
          Recent Votes
        </h2>
        <div className="bg-surface border-border mt-4 overflow-hidden rounded-xl border shadow-xs">
          {/* Desktop Table Header */}
          <div className="border-border bg-surface-alt text-text-muted hidden border-b px-6 py-3 text-xs font-semibold tracking-wider uppercase md:grid md:grid-cols-[2.5fr_1.5fr_0.7fr_1fr_1.2fr_1fr_0.8fr] md:gap-4">
            <div>Anime</div>
            <div>Trigger Category</div>
            <div>Present?</div>
            <div>Severity</div>
            <div>Framing</div>
            <div>Voted By</div>
            <div className="md:text-right">Voted At</div>
          </div>

          {/* Table Body */}
          <div className="divide-border divide-y">
            {/* Vote Entry 1 */}
            <div className="grid grid-cols-1 items-center gap-2 p-5 text-sm md:grid-cols-[2.5fr_1.5fr_0.7fr_1fr_1.2fr_1fr_0.8fr] md:gap-4 md:px-6 md:py-4">
              <div className="text-text font-serif text-base font-bold md:font-sans md:text-sm md:font-semibold">
                Chainsaw Man
              </div>
              <div className="text-text-muted md:text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Category:
                </span>
                Animal Death
              </div>
              <div className="text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Present?:
                </span>
                <span className="text-accent-red font-medium">Yes</span>
              </div>
              <div>
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Severity:
                </span>
                <span className="text-severity-severe font-bold">Severe</span>
              </div>
              <div className="text-text-muted">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Framing:
                </span>
                Graphic
              </div>
              <div className="text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Voted By:
                </span>
                MakimaFan
              </div>
              <div className="text-text-muted text-xs md:text-right">
                2 mins ago
              </div>
            </div>

            {/* Vote Entry 2 */}
            <div className="grid grid-cols-1 items-center gap-2 p-5 text-sm md:grid-cols-[2.5fr_1.5fr_0.7fr_1fr_1.2fr_1fr_0.8fr] md:gap-4 md:px-6 md:py-4">
              <div className="text-text font-serif text-base font-bold md:font-sans md:text-sm md:font-semibold">
                Bocchi the Rock!
              </div>
              <div className="text-text-muted md:text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Category:
                </span>
                Panic Attacks
              </div>
              <div className="text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Present?:
                </span>
                <span className="text-accent-red font-medium">Yes</span>
              </div>
              <div>
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Severity:
                </span>
                <span className="text-severity-moderate font-bold">
                  Moderate
                </span>
              </div>
              <div className="text-text-muted">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Framing:
                </span>
                Played for Laughs
              </div>
              <div className="text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Voted By:
                </span>
                GuitarHero
              </div>
              <div className="text-text-muted text-xs md:text-right">
                14 mins ago
              </div>
            </div>

            {/* Vote Entry 3 */}
            <div className="grid grid-cols-1 items-center gap-2 p-5 text-sm md:grid-cols-[2.5fr_1.5fr_0.7fr_1fr_1.2fr_1fr_0.8fr] md:gap-4 md:px-6 md:py-4">
              <div className="text-text font-serif text-base font-bold md:font-sans md:text-sm md:font-semibold">
                Frieren: Beyond Journey&apos;s End
              </div>
              <div className="text-text-muted md:text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Category:
                </span>
                Gore
              </div>
              <div className="text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Present?:
                </span>
                <span className="text-success font-medium">No</span>
              </div>
              <div>
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Severity:
                </span>
                <span className="text-severity-mild font-bold">Mild</span>
              </div>
              <div className="text-text-muted">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Framing:
                </span>
                Fantasy Violence
              </div>
              <div className="text-text">
                <span className="text-text-muted mr-1 font-medium md:hidden">
                  Voted By:
                </span>
                HimmelTheHero
              </div>
              <div className="text-text-muted text-xs md:text-right">
                1 hour ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentVotes;
