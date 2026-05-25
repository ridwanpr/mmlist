import { useState } from "react";

import FilterButton from "./FilterButton";
import TriggerItem from "./TriggerItem";

const TriggerWarning = ({
  triggers,
  anime,
  userTriggerVote,
  aiTriggerContext,
}: {
  triggers: App.DTOs.TriggerData[];
  anime: App.DTOs.AnimeData;
  userTriggerVote: App.DTOs.AnimeTriggerData[] | null;
  aiTriggerContext: App.DTOs.AnimeTriggerContextData[] | null;
}) => {
  const [filterTrigger, setFilterTrigger] = useState<string | number>("all");
  const [viewMode, setViewMode] = useState<"comfortable" | "compact">(
    "comfortable",
  );

  const handleFilterTrigger = (triggerId: string | number) => {
    setFilterTrigger(triggerId);
  };

  const filteredTriggers =
    filterTrigger === "all"
      ? triggers
      : triggers.filter((t) => t.id === filterTrigger);

  return (
    <>
      <div className="mt-4">
        <h1 className="text-text font-semibold">Trigger Warning</h1>
        <p className="text-text-muted text-sm">
          Click each trigger to see detail and vote. Might contain spoiler.
        </p>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 lg:flex-row">
        {/* Trigger Category Filter */}
        <section className="bg-surface border-border w-full self-start rounded-lg border p-4 lg:flex lg:w-72 lg:flex-col">
          <div className="border-border flex w-full items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-text text-sm font-bold">Filter Triggers</h2>
              <p className="text-text-muted mt-0.5 text-xs">
                Click to filter trigger by category
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex flex-col gap-2.5">
              <FilterButton
                label="All Categories"
                isActive={filterTrigger === "all"}
                onClick={() => handleFilterTrigger("all")}
              />
              {triggers?.map((trigger) => (
                <FilterButton
                  key={trigger.id}
                  label={trigger.name}
                  isActive={filterTrigger === trigger.id}
                  onClick={() => handleFilterTrigger(trigger.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trigger Content List */}
        <section className="flex-1">
          {/* Header Controls Layout */}
          <div className="border-border mb-4 flex items-center justify-between border-b pb-3">
            <h2 className="text-text font-semibold">
              {filterTrigger === "all"
                ? "Showing All Categories"
                : "Filtered Content"}
            </h2>

            {/* Toggle Switch Container */}
            <div className="bg-surface-alt border-border flex items-center gap-1 rounded-md border p-1">
              <button
                type="button"
                onClick={() => setViewMode("comfortable")}
                className={`cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewMode === "comfortable"
                    ? "bg-surface text-text shadow-xs"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Comfort
              </button>
              <button
                type="button"
                onClick={() => setViewMode("compact")}
                className={`cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  viewMode === "compact"
                    ? "bg-surface text-text shadow-xs"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Compact
              </button>
            </div>
          </div>

          {filteredTriggers?.map((category) => (
            <div key={category.id} className="mb-6">
              <div className="border-primary my-3 border-l-2 px-2">
                <h3 className="text-text text-sm font-semibold">
                  {category.name}
                </h3>
                {viewMode === "comfortable" && category.description && (
                  <p className="text-text-muted mt-0.5 text-xs">
                    {category.description}
                  </p>
                )}
              </div>

              <div
                className={
                  viewMode === "compact"
                    ? "flex flex-col gap-2"
                    : "flex flex-col gap-4"
                }
              >
                {category?.triggerContents.map((triggerContent) => (
                  <TriggerItem
                    key={triggerContent.id}
                    triggerContent={triggerContent}
                    animeSlug={anime.slug}
                    userTriggerVote={userTriggerVote}
                    aiTriggerContext={aiTriggerContext}
                    isCompact={viewMode === "compact"}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default TriggerWarning;
