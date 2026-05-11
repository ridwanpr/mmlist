import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const TriggerWarning = () => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Trigger Header */}
      <div>
        <h2 className="text-text text-xl font-semibold">Trigger Warnings</h2>
        <p className="text-text-muted flex flex-wrap items-center gap-1 text-sm">
          <span>Click for more details.</span>

          <span className="font-bold whitespace-nowrap italic">
            Might contain spoilers.
          </span>
        </p>
      </div>
      {/* Trigger Content */}
      <div className="flex w-full flex-col gap-2">
        <Disclosure as="div" className="border-border w-full rounded-lg border">
          <DisclosureButton className="border-border hover:bg-surface-alt bg-surface flex w-full flex-col items-start justify-between gap-4 rounded-lg border p-3 text-left hover:cursor-pointer md:flex-row md:items-center md:gap-2">
            <div className="flex items-start gap-3 md:items-center">
              <div>
                <h3 className="text-lg font-semibold">Violence and Gore</h3>
                <p className="text-text/90 mt-1 text-sm md:mt-0">
                  Physical harm, bloodshed, torture, war violence, executions
                  and more.
                </p>
              </div>
            </div>

            <div className="border-border mt-1 flex w-full items-center justify-between gap-3 border-t pt-3 md:mt-0 md:w-auto md:justify-end md:border-none md:pt-0">
              <div className="rounded bg-red-100 px-2 py-1 text-sm font-bold text-red-400">
                Severe
              </div>
              <p className="text-sm font-semibold whitespace-nowrap">
                1,829 Votes
              </p>
            </div>
          </DisclosureButton>

          <div className="overflow-hidden">
            <DisclosurePanel
              transition
              className="origin-top p-3 transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0 md:p-4"
            >
              <div className="mb-4 flex flex-col gap-2">
                <p className="text-sm font-bold">Specific Triggers</p>
              </div>

              {/* Table Headers - Hidden on mobile, visible on medium+ screens */}
              <div className="text-text-muted mb-2 hidden grid-cols-12 gap-4 px-3 text-xs font-semibold md:grid">
                <p className="col-span-3">Trigger</p>
                <p className="col-span-6">Explanation</p>
                <p className="col-span-2">Severity</p>
                <p className="col-span-1 text-right">Votes</p>
              </div>

              {/* Trigger List Container */}
              <div className="flex flex-col gap-3">
                {/* Trigger Item 1 */}
                <Disclosure
                  as="div"
                  className="border-border w-full rounded-lg border"
                >
                  <DisclosureButton className="border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-1 items-start gap-2 rounded-lg border p-3 text-left hover:cursor-pointer md:grid-cols-12 md:items-center md:gap-4">
                    {/* Mobile: Title & Severity row | Desktop: Just Title */}
                    <div className="flex w-full items-center justify-between md:col-span-3 md:block">
                      <p className="text-sm font-bold md:font-medium">
                        Character Death
                      </p>
                      <p className="text-xs font-bold text-yellow-500 md:hidden">
                        Very Severe
                      </p>
                    </div>

                    <p className="text-text/80 text-sm md:col-span-6 md:text-current">
                      Main or Side Character die in battle and other violent
                      situations.
                    </p>

                    {/* Desktop only Severity column */}
                    <p className="col-span-2 hidden text-sm font-medium text-yellow-500 md:block">
                      Very Severe
                    </p>

                    {/* Mobile: Votes row | Desktop: Just Votes right-aligned */}
                    <div className="border-border/50 mt-2 flex w-full items-center justify-between border-t pt-2 md:col-span-1 md:mt-0 md:block md:border-none md:pt-0">
                      <span className="text-text-muted text-xs md:hidden">
                        Votes
                      </span>
                      <p className="text-sm font-medium md:text-right">1,756</p>
                    </div>
                  </DisclosureButton>

                  {/* Voting Panel */}
                  <DisclosurePanel className="bg-surface-alt/30 border-border rounded-b-lg border-t p-4">
                    <div className="mb-6 flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-2">
                      <p className="text-text font-bold">What do you think?</p>
                      <p className="text-text-muted">
                        Your vote helps keep warnings accurate.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-medium">
                          Did this trigger appear?
                        </p>
                        <div className="flex items-center gap-2">
                          <button className="border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5">
                            Yes
                          </button>
                          <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5">
                            No
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 md:col-span-2">
                        <p className="text-sm font-medium">
                          How severe was it?
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-2 py-2 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none md:py-1.5">
                            Mild
                          </button>
                          <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-2 py-2 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none md:py-1.5">
                            Moderate
                          </button>
                          <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-2 py-2 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none md:py-1.5">
                            Severe
                          </button>
                          <button className="border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-25 flex-1 rounded-lg border-2 px-2 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none md:py-1.5">
                            Very Severe
                          </button>
                        </div>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>

                {/* Trigger Item 2 */}
                <Disclosure
                  as="div"
                  className="border-border w-full rounded-lg border"
                >
                  <DisclosureButton className="border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-1 items-start gap-2 rounded-lg border p-3 text-left hover:cursor-pointer md:grid-cols-12 md:items-center md:gap-4">
                    <div className="flex w-full items-center justify-between md:col-span-3 md:block">
                      <p className="text-sm font-bold md:font-medium">
                        Graphic Gore
                      </p>
                      <p className="text-xs font-bold text-red-500 md:hidden">
                        Severe
                      </p>
                    </div>

                    <p className="text-text/80 text-sm md:col-span-6 md:text-current">
                      Detailed depictions of blood, organs, and severe bodily
                      injuries.
                    </p>

                    <p className="col-span-2 hidden text-sm font-medium text-red-500 md:block">
                      Severe
                    </p>

                    <div className="border-border/50 mt-2 flex w-full items-center justify-between border-t pt-2 md:col-span-1 md:mt-0 md:block md:border-none md:pt-0">
                      <span className="text-text-muted text-xs md:hidden">
                        Votes
                      </span>
                      <p className="text-sm font-medium md:text-right">1,756</p>
                    </div>
                  </DisclosureButton>

                  <DisclosurePanel className="bg-surface-alt/30 border-border rounded-b-lg border-t p-4">
                    <div className="mb-6 flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-2">
                      <p className="text-text font-bold">What do you think?</p>
                      <p className="text-text-muted">
                        Your vote helps keep warnings accurate.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-medium">
                          Did this trigger appear?
                        </p>
                        <div className="flex items-center gap-2">
                          <button className="border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5">
                            Yes
                          </button>
                          <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:py-1.5">
                            No
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 md:col-span-2">
                        <p className="text-sm font-medium">
                          How severe was it?
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-2 py-2 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none md:py-1.5">
                            Mild
                          </button>
                          <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-2 py-2 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none md:py-1.5">
                            Moderate
                          </button>
                          <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-2 py-2 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none md:py-1.5">
                            Severe
                          </button>
                          <button className="border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-25 flex-1 rounded-lg border-2 px-2 py-2 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none md:py-1.5">
                            Very Severe
                          </button>
                        </div>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};

export default TriggerWarning;
