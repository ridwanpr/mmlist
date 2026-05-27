type TriggerStatProps = {
  triggerStatData: App.DTOs.AnimeTriggerStatData;
};

type StatItem = {
  term: string;
  detail: string;
  context?: string;
};

function dominant(
  items: { label: string; count: number }[],
): { label: string; count: number } | null {
  const nonZero = items.filter((i) => i.count > 0);
  if (nonZero.length === 0) return null;
  return nonZero.reduce((a, b) => (b.count > a.count ? b : a));
}

const TriggerStat = ({ triggerStatData }: TriggerStatProps) => {
  const {
    totalReports,
    appearYesCount,
    appearNoCount,
    severityMild,
    severityModerate,
    severitySevere,
    framingSerious,
    framingNeutral,
    framingRomanticized,
    framingComedic,
  } = triggerStatData;

  if (totalReports === 0) {
    return (
      <section
        aria-label="Trigger report summary"
        className="mb-6 border-b pb-5"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="text-sm italic"
          style={{ color: "var(--color-text-muted)" }}
        >
          No community reports yet. Be the first to share your experience.
        </p>
      </section>
    );
  }

  const totalVoted = appearYesCount + appearNoCount;
  const appearsPercent =
    totalVoted > 0 ? Math.round((appearYesCount / totalVoted) * 100) : null;

  const topSeverity = dominant([
    { label: "Mild", count: severityMild },
    { label: "Moderate", count: severityModerate },
    { label: "Severe", count: severitySevere },
  ]);

  const topFraming = dominant([
    { label: "Serious", count: framingSerious },
    { label: "Neutral", count: framingNeutral },
    { label: "Romanticized", count: framingRomanticized },
    { label: "Comedic", count: framingComedic },
  ]);

  const stats: StatItem[] = [
    {
      term: "Community reports",
      detail: totalReports.toLocaleString(),
    },
    ...(appearsPercent !== null
      ? [
          {
            term: "Say it appears",
            detail: `${appearsPercent}%`,
            context: `${appearYesCount} of ${totalVoted} voters`,
          },
        ]
      : []),
    ...(topSeverity
      ? [{ term: "Most reported severity", detail: topSeverity.label }]
      : []),
    ...(topFraming
      ? [{ term: "Most reported framing", detail: topFraming.label }]
      : []),
  ];

  return (
    <section
      aria-label="Trigger report summary"
      className="border-border mb-8 border-b"
    >
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-5 sm:flex sm:flex-nowrap sm:gap-0">
        {stats.map((stat, i) => (
          <div
            key={stat.term}
            className="sm:border-border flex flex-col sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
          >
            <dt
              className="text-[11px] font-medium tracking-wide uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              {stat.term}
            </dt>
            <dd
              className="mt-1 text-[22px] leading-tight font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {stat.detail}
            </dd>
            {stat.context && (
              <span
                className="mt-1 text-[11px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {stat.context}
              </span>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TriggerStat;
