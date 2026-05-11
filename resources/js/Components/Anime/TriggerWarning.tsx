import { useState } from "react";

const TriggerWarning = ({ triggers }: { triggers: App.DTOs.TriggerData[] }) => {
  const [compactMode, setCompactMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("trigger-view-mode") === "compact";
  });

  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);

  const toggleMode = () => {
    const next = !compactMode;

    setCompactMode(next);

    localStorage.setItem("trigger-view-mode", next ? "compact" : "detailed");
  };

  return (
    <div className="mt-10">
      {/* HEADER */}
      <div className="border-border mb-8 flex flex-col gap-4 border-b pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-text text-2xl font-bold">Trigger Warnings</h2>

          <p className="text-text-muted mt-1 text-sm">
            <em>Details may contain spoilers.</em>
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search triggers..."
              className="border-border bg-surface text-text focus:border-primary w-full rounded-md border px-4 py-2 text-sm focus:outline-none"
              disabled
            />
          </div>

          <button
            onClick={toggleMode}
            className="border-border bg-surface hover:bg-surface-hover text-text rounded-md border px-3 py-2 text-sm font-medium transition-colors"
          >
            {compactMode ? "Detailed View" : "Compact View"}
          </button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* COMPACT MODE */}
      {/* ====================================================== */}

      {compactMode ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
          {triggers.map((trigger) => (
            <section
              key={trigger.name}
              className="border-border bg-surface overflow-hidden rounded-lg border"
            >
              {/* CATEGORY HEADER */}
              <div className="border-border bg-background/60 border-b px-3 py-2.5">
                <h3 className="text-text text-sm font-semibold tracking-wide uppercase">
                  {trigger.name}
                </h3>
              </div>

              {/* ROWS */}
              <div className="divide-border divide-y">
                {trigger.triggerContents.map((tc) => {
                  const key = `${trigger.name}::${tc.name}`;
                  const isOpen = selectedTrigger === key;

                  return (
                    <div key={key}>
                      {/* ROW */}
                      <button
                        onClick={() => setSelectedTrigger(isOpen ? null : key)}
                        className="hover:bg-background/40 flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors"
                      >
                        {/* LEFT */}
                        <div className="min-w-0 flex-1">
                          <div className="text-text truncate text-sm font-medium">
                            {tc.name}
                          </div>

                          <div className="text-text-muted mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                            <span>Moderate severity</span>

                            <span className="opacity-40">•</span>

                            <span>Serious framing</span>

                            <span className="opacity-40">•</span>

                            <span>142 votes</span>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex shrink-0 items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-orange-500" />

                          <span className="text-text-muted text-[11px] font-medium">
                            142
                          </span>
                        </div>
                      </button>

                      {/* EXPANDED CONTENT */}
                      {isOpen ? (
                        <div className="border-border/60 bg-background/30 border-t px-3 py-3">
                          {/* DESCRIPTION */}
                          {tc.description ? (
                            <p className="text-text-muted text-sm leading-relaxed">
                              {tc.description}
                            </p>
                          ) : (
                            <p className="text-text-muted text-sm italic">
                              No description available.
                            </p>
                          )}

                          {/* INLINE STATS */}
                          <div className="mt-4 flex flex-wrap gap-2 text-xs">
                            <div className="bg-background rounded-md px-2 py-1">
                              <span className="text-text-muted">Severity:</span>{" "}
                              <span className="text-text font-medium">
                                Moderate
                              </span>
                            </div>

                            <div className="bg-background rounded-md px-2 py-1">
                              <span className="text-text-muted">Framing:</span>{" "}
                              <span className="text-text font-medium">
                                Serious
                              </span>
                            </div>

                            <div className="bg-background rounded-md px-2 py-1">
                              <span className="text-text-muted">YES:</span>{" "}
                              <span className="font-medium text-red-600">
                                142
                              </span>
                            </div>

                            <div className="bg-background rounded-md px-2 py-1">
                              <span className="text-text-muted">NO:</span>{" "}
                              <span className="text-text font-medium">18</span>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div className="mt-4 flex gap-2">
                            <button className="bg-primary rounded-md px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                              Cast Vote
                            </button>

                            <button className="border-border bg-surface hover:bg-surface-hover text-text rounded-md border px-3 py-2 text-sm font-medium transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* ====================================================== */
        /* DETAILED MODE */
        /* ====================================================== */

        <div className="flex flex-col gap-10">
          {triggers.map((trigger) => (
            <section key={trigger.name} className="flex flex-col gap-4">
              <div className="bg-background/95 sticky top-0 z-10 py-2 backdrop-blur">
                <h3 className="border-primary text-text border-l-4 pl-3 text-base font-bold tracking-wider uppercase">
                  {trigger.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {trigger.triggerContents.map((tc) => {
                  const key = `${trigger.name}::${tc.name}`;

                  return (
                    <div
                      key={key}
                      className="border-border bg-surface flex h-full flex-col rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-1 flex-col p-4">
                        {/* TOP */}
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <h4 className="text-text text-sm leading-snug font-semibold">
                            {tc.name}
                          </h4>

                          <div className="flex shrink-0 items-center gap-1 text-[11px] font-bold tracking-wide">
                            <span className="rounded bg-red-500/10 px-2 py-1 text-red-600">
                              YES: 142
                            </span>

                            <span className="rounded bg-slate-500/10 px-2 py-1 text-slate-600">
                              NO: 18
                            </span>
                          </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                          {tc.description ? (
                            <p className="text-text-muted line-clamp-2 text-sm leading-relaxed">
                              {tc.description}
                            </p>
                          ) : (
                            <p className="text-text-muted text-sm italic">
                              No description available.
                            </p>
                          )}
                        </div>

                        {/* STATS */}
                        <div className="border-border/50 mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-xs">
                          {/* SEVERITY */}
                          <div className="flex flex-col gap-1.5">
                            <span className="text-text-muted text-[10px] font-bold tracking-widest uppercase">
                              Severity
                            </span>

                            <ul className="flex flex-col gap-1">
                              <li className="text-text-muted flex items-center justify-between">
                                <span>Mild</span>
                                <span>12</span>
                              </li>

                              <li className="text-text flex items-center justify-between font-medium">
                                <span>Moderate</span>
                                <span>85</span>
                              </li>

                              <li className="text-text-muted flex items-center justify-between">
                                <span>Severe</span>
                                <span>32</span>
                              </li>

                              <li className="text-text-muted flex items-center justify-between">
                                <span>Extreme</span>
                                <span>3</span>
                              </li>
                            </ul>
                          </div>

                          {/* FRAMING */}
                          <div className="border-border/50 flex flex-col gap-1.5 border-l pl-4">
                            <span className="text-text-muted text-[10px] font-bold tracking-widest uppercase">
                              Framing
                            </span>

                            <ul className="flex flex-col gap-1">
                              <li className="text-text flex items-center justify-between font-medium">
                                <span>Serious</span>
                                <span>110</span>
                              </li>

                              <li className="text-text-muted flex items-center justify-between">
                                <span>Neutral</span>
                                <span>20</span>
                              </li>

                              <li className="text-text-muted flex items-center justify-between">
                                <span>Romanticized</span>
                                <span>5</span>
                              </li>

                              <li className="text-text-muted flex items-center justify-between">
                                <span>Comedic</span>
                                <span>7</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-auto pt-5">
                          <button className="bg-primary focus:ring-primary w-full cursor-pointer rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none">
                            Cast Vote
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default TriggerWarning;
