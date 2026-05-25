const RecentVotes = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl p-4">
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">
          Recent Votes
        </h2>
        <div className="bg-surface border-border mt-4">
          <div className="border-border bg-surface-alt text-text-muted hidden border-b px-6 py-2 text-xs font-semibold tracking-wider uppercase md:grid md:grid-cols-[3fr_1.5fr_0.6fr_1fr_1fr_0.9fr] md:gap-4">
            <div>Anime</div>
            <div>Trigger Category</div>
            <div>Present?</div>
            <div>Severity</div>
            <div>Framing</div>
            <div className="md:text-right">Voted At</div>
          </div>
          <div className="divide-border divide-y">

          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentVotes;
