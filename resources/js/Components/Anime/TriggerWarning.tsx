import { LuChevronDown, LuThumbsDown, LuThumbsUp } from "react-icons/lu";

const TriggerWarning = ({ triggers }: { triggers: App.DTOs.TriggerData[] }) => {
  console.log(triggers);
  return (
    <>
      <div className="mt-4">
        <h1 className="font-semibold">Trigger Warning</h1>
        <p className="text-text-muted text-sm">
          Click each trigger to see detail and vote.
        </p>
      </div>
      <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 lg:flex-row">
        {/*Trigger Category Filter*/}
        <section className="border-border bg-surface w-full rounded-lg border p-2 lg:w-67.5">
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <p className="text-text/90 text-sm font-semibold">
                Filter by Category
              </p>
              <p className="text-text-muted text-xs">Click to filter</p>
            </div>
            <button
              id="all-category"
              className="bg-surface-alt hover:bg-primary-soft text-text w-full rounded p-2 text-center text-sm font-medium hover:cursor-pointer"
            >
              All Category
            </button>
            {triggers?.map((trigger) => (
              <button
                key={trigger.id}
                id="all-category"
                className="bg-surface-alt hover:bg-primary-soft txt-text w-full rounded p-2 text-center text-sm font-medium hover:cursor-pointer"
              >
                {trigger.name}
              </button>
            ))}
          </div>
        </section>

        {/*Trigger Content List*/}
        <section className="flex-1">
          {/*Trigger Content Header*/}
          <div className="mb-4">
            <h2 className="text-text font-semibold">Showing All Categories</h2>
            <p className="text-text-muted text-sm">100 Triggers Found</p>
          </div>
          <div className="border-primary mb-4 border-l-2 px-2">
            <h2 className="text-text font-semibold">
              Taboos & Controversial Dynamics
            </h2>
            <p className="text-text-muted text-sm">
              Highly controversial relationship dynamics and anime tropes that
              viewers frequently want to avoid.
            </p>
          </div>
          {/*Trigger Content List*/}
          <div className="border-border bg-surface flex flex-wrap items-center gap-x-6 gap-y-3 self-start rounded-lg border p-4">
            {/* Left */}
            <div className="min-w-40 flex-1">
              <p className="text-sm font-semibold">NTR (Netorare)</p>
              <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
                Severe romantic betrayal, cheating, or having a partner taken
                away.
              </p>
            </div>

            {/* Middle — Severity & Framing */}
            <div className="flex flex-1 flex-col gap-1.5">
              {/* Severity */}
              <div className="flex items-baseline gap-3">
                <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
                  Severity
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-xs text-amber-600">
                    Mild{" "}
                    <strong className="font-semibold text-amber-700 tabular-nums">
                      10
                    </strong>
                  </span>
                  <span className="text-xs text-orange-600">
                    Moderate{" "}
                    <strong className="font-semibold text-orange-700 tabular-nums">
                      10
                    </strong>
                  </span>
                  <span className="text-xs text-red-600">
                    Severe{" "}
                    <strong className="font-semibold text-red-700 tabular-nums">
                      10
                    </strong>
                  </span>
                  <span className="text-xs text-purple-600">
                    Extreme{" "}
                    <strong className="font-semibold text-purple-700 tabular-nums">
                      10
                    </strong>
                  </span>
                </div>
              </div>

              {/* Framing */}
              <div className="flex items-baseline gap-3">
                <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
                  Framing
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-text-muted text-xs">
                    Serious{" "}
                    <strong className="text-text-primary font-semibold tabular-nums">
                      10
                    </strong>
                  </span>
                  <span className="text-text-muted text-xs">
                    Neutral{" "}
                    <strong className="text-text-primary font-semibold tabular-nums">
                      10
                    </strong>
                  </span>
                  <span className="text-text-muted text-xs">
                    Romanticized{" "}
                    <strong className="text-text-primary font-semibold tabular-nums">
                      10
                    </strong>
                  </span>
                  <span className="text-text-muted text-xs">
                    Comedic{" "}
                    <strong className="text-text-primary font-semibold tabular-nums">
                      10
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Rightmost — Yes/No + Chevron */}
            <div className="flex shrink-0 items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-text-muted text-[10px] font-medium tracking-widest uppercase">
                  Appears?
                </span>
                <div className="flex gap-3">
                  <div className="flex w-10 flex-col items-center">
                    <strong className="text-sm font-semibold text-green-600 tabular-nums">
                      10
                    </strong>
                    <LuThumbsUp className="text-base text-green-600" />
                  </div>
                  <div className="flex w-10 flex-col items-center">
                    <strong className="text-sm font-semibold text-red-500 tabular-nums">
                      10
                    </strong>
                    <LuThumbsDown className="text-base text-red-500" />
                  </div>
                </div>
              </div>
              <LuChevronDown className="text-text-muted text-base" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TriggerWarning;
