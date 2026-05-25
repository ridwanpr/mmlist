type TriggerStatProps = {
  data: App.DTOs.AnimeTriggerStatData;
};

const TriggerStat = ({ data }: TriggerStatProps) => {
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
  } = data;

  const getPct = (count: number) =>
    totalReports > 0 ? Math.round((count / totalReports) * 100) : 0;

  if (totalReports === 0) return null;

  return (
    <div className="bg-surface border-border w-full rounded-xl border p-5 font-sans shadow-2xs">
      {/* Splits the wide space into 3 perfectly aligned content pillars */}
      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-3 md:gap-8">
        {/* Column 1: Core Content Presence */}
        <div className="space-y-2">
          <span className="text-text-muted block text-[10px] font-bold tracking-wider uppercase">
            Community Verdict
          </span>
          <div className="space-y-1">
            <div className="flex items-baseline gap-x-2 font-mono text-xl font-black tracking-tight md:text-2xl">
              <span className="text-primary">{getPct(appearYesCount)}%</span>
              <span className="text-text-muted font-sans text-xs font-semibold">
                Yes ({appearYesCount})
              </span>
            </div>
            <div className="text-text flex items-baseline gap-x-2 font-mono text-lg font-bold">
              <span className="text-text-muted">{getPct(appearNoCount)}%</span>
              <span className="text-text-muted font-sans text-xs font-semibold">
                No ({appearNoCount})
              </span>
            </div>
            <div className="text-text-muted pt-1 text-xs font-medium">
              Based on {totalReports} total{" "}
              {totalReports === 1 ? "report" : "reports"}
            </div>
          </div>
        </div>

        {/* Column 2: Severity Vertical List */}
        <div className="md:border-border/40 space-y-2 md:border-l md:pl-6">
          <span className="text-text-muted block text-[10px] font-bold tracking-wider uppercase">
            Reported Severity
          </span>
          <div className="space-y-2">
            {[
              { label: "Mild", pct: getPct(severityMild), count: severityMild },
              {
                label: "Moderate",
                pct: getPct(severityModerate),
                count: severityModerate,
              },
              {
                label: "Severe",
                pct: getPct(severitySevere),
                count: severitySevere,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border-border/30 flex items-center justify-between border-b pb-1 text-sm last:border-0 last:pb-0"
              >
                <span className="text-text-muted text-xs font-medium">
                  {item.label}
                </span>
                <span className="text-text font-mono text-sm font-bold">
                  {item.pct}%{" "}
                  <span className="text-text-muted font-sans text-xs font-normal">
                    ({item.count})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Framing Mini Grid */}
        <div className="md:border-border/40 space-y-2 md:border-l md:pl-6">
          <span className="text-text-muted block text-[10px] font-bold tracking-wider uppercase">
            Narrative Framing
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              {
                label: "Serious",
                pct: getPct(framingSerious),
                count: framingSerious,
              },
              {
                label: "Neutral",
                pct: getPct(framingNeutral),
                count: framingNeutral,
              },
              {
                label: "Romantic",
                pct: getPct(framingRomanticized),
                count: framingRomanticized,
              },
              {
                label: "Comedic",
                pct: getPct(framingComedic),
                count: framingComedic,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border-border/50 flex flex-col border-l-2 pl-2"
              >
                <span className="text-text-muted text-[10px] font-semibold tracking-wide uppercase">
                  {item.label}
                </span>
                <span className="text-text mt-0.5 font-mono text-sm font-bold">
                  {item.pct}%{" "}
                  <span className="text-text-muted font-sans text-xs font-normal">
                    ({item.count})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriggerStat;
