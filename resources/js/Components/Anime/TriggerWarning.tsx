const TriggerWarning = ({ triggers }: { triggers: App.DTOs.TriggerData[] }) => {
  return (
    <div className="mt-10">
      <div className="border-border mb-8 flex flex-col gap-4 border-b pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-text text-2xl font-bold">Trigger Warnings</h2>

          <p className="text-text-muted mt-1 text-sm">
            <em>Details may contain spoilers.</em>
          </p>
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search triggers..."
            className="border-border bg-surface text-text focus:border-primary w-full rounded-md border px-4 py-2 text-sm focus:outline-none"
            disabled
          />
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {triggers.map((trigger) => (
          <section key={trigger.name} className="flex flex-col gap-5">
            <div className="bg-background/95 sticky top-0 z-10 py-3 backdrop-blur">
              <h3 className="border-primary text-text border-l-4 pl-3 text-lg font-bold tracking-wider uppercase">
                {trigger.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trigger.triggerContents.map((tc) => {
                const key = `${trigger.name}::${tc.name}`;

                return (
                  <div
                    key={key}
                    className="border-border bg-surface flex h-full flex-col rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <h4 className="text-text text-base leading-snug font-semibold">
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

                      <div className="min-h-12">
                        {tc.description ? (
                          <p className="text-text-muted line-clamp-3 text-sm leading-relaxed">
                            {tc.description}
                          </p>
                        ) : (
                          <p className="text-text-muted text-sm italic">
                            No description available.
                          </p>
                        )}
                      </div>

                      <div className="border-border/50 mt-5 grid grid-cols-2 gap-5 border-t pt-5 text-xs">
                        <div className="flex flex-col gap-2">
                          <span className="text-text-muted text-[10px] font-bold tracking-[0.2em] uppercase">
                            Severity
                          </span>

                          <ul className="flex flex-col gap-1.5">
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

                        <div className="border-border/50 flex flex-col gap-2 border-l pl-5">
                          <span className="text-text-muted text-[10px] font-bold tracking-[0.2em] uppercase">
                            Framing
                          </span>

                          <ul className="flex flex-col gap-1.5">
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

                      <div className="mt-auto pt-6">
                        <button className="bg-primary focus:ring-primary w-full cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none">
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
    </div>
  );
};

export default TriggerWarning;
