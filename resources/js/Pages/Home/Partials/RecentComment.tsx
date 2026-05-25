const RecentComment = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">
          Recent Comments
        </h2>
        <div className="bg-surface border-border divide-border mt-4 divide-y overflow-hidden rounded-xl border shadow-xs">
          {/* Comment Row 1 */}
          <div className="flex flex-col gap-1.5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-primary cursor-pointer font-serif text-base font-bold transition-colors hover:underline">
                Neon Genesis Evangelion
              </span>
              <span className="text-text-muted text-xs">5 mins ago</span>
            </div>
            <div className="text-text-muted text-xs">
              By <span className="text-text font-medium">AsukaFan95</span>
            </div>
            <p className="text-text mt-1 text-sm leading-relaxed">
              The psychological distress elements peak heavily in episodes 25
              and 26. Highly recommend pacing yourself if you are sensitive to
              heavy themes of existential dread or depersonalization.
            </p>
          </div>

          {/* Comment Row 2 */}
          <div className="flex flex-col gap-1.5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-primary cursor-pointer font-serif text-base font-bold transition-colors hover:underline">
                Attack on Titan
              </span>
              <span className="text-text-muted text-xs">24 mins ago</span>
            </div>
            <div className="text-text-muted text-xs">
              By <span className="text-text font-medium">SurveyScout</span>
            </div>
            <p className="text-text mt-1 text-sm leading-relaxed">
              Regarding the animal death warning in season 1: the horses are
              caught in the crossfire during the expedition sequences. It
              happens relatively quickly but the visual framing is intense.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-primary cursor-pointer font-serif text-base font-bold transition-colors hover:underline">
                Attack on Titan
              </span>
              <span className="text-text-muted text-xs">24 mins ago</span>
            </div>
            <div className="text-text-muted text-xs">
              By <span className="text-text font-medium">SurveyScout</span>
            </div>
            <p className="text-text mt-1 text-sm leading-relaxed">
              Regarding the animal death warning in season 1: the horses are
              caught in the crossfire during the expedition sequences. It
              happens relatively quickly but the visual framing is intense.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-primary cursor-pointer font-serif text-base font-bold transition-colors hover:underline">
                Attack on Titan
              </span>
              <span className="text-text-muted text-xs">24 mins ago</span>
            </div>
            <div className="text-text-muted text-xs">
              By <span className="text-text font-medium">SurveyScout</span>
            </div>
            <p className="text-text mt-1 text-sm leading-relaxed">
              Regarding the animal death warning in season 1: the horses are
              caught in the crossfire during the expedition sequences. It
              happens relatively quickly but the visual framing is intense.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-primary cursor-pointer font-serif text-base font-bold transition-colors hover:underline">
                Attack on Titan
              </span>
              <span className="text-text-muted text-xs">24 mins ago</span>
            </div>
            <div className="text-text-muted text-xs">
              By <span className="text-text font-medium">SurveyScout</span>
            </div>
            <p className="text-text mt-1 text-sm leading-relaxed">
              Regarding the animal death warning in season 1: the horses are
              caught in the crossfire during the expedition sequences. It
              happens relatively quickly but the visual framing is intense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentComment;
