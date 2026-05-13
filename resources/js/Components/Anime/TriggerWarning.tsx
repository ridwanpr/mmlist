import { useState } from "react";

import FilterButton from "./FilterButton";
import TriggerItem from "./TriggerItem";

const TriggerWarning = ({
  triggers,
  anime,
}: {
  triggers: App.DTOs.TriggerData[];
  anime: App.DTOs.AnimeData;
}) => {
  const [filterTrigger, setFilterTrigger] = useState<string | number>("all");

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
        <h1 className="font-semibold">Trigger Warning</h1>
        <p className="text-text-muted text-sm">
          Click each trigger to see detail and vote. Might contain spoilers.
        </p>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 lg:flex-row">
        {/* Trigger Category Filter (Unified with RefineResults style) */}
        <section className="bg-background border-border w-full self-start rounded-lg border p-5 lg:flex lg:w-72 lg:flex-col lg:gap-6">
          {" "}
          <div className="border-border flex w-full items-center justify-between border-b pb-4">
            <h2 className="text-text font-bold">Filter Triggers</h2>
            <p className="text-text-muted text-xs">Categories</p>
          </div>
          <div className="mt-1 flex flex-col gap-3">
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
          {filterTrigger === "all" && (
            <h2 className="text-text mb-4 font-semibold">
              Showing All Categories
            </h2>
          )}

          {filteredTriggers?.map((triggers) => (
            <div key={triggers.id}>
              <div className="border-primary my-4 border-l-2 px-2">
                <h2 className="text-text font-semibold">{triggers.name}</h2>
                <p className="text-text-muted text-sm">
                  {triggers?.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {triggers?.triggerContents.map((triggerContent) => (
                  <TriggerItem
                    key={triggerContent.id}
                    triggerContent={triggerContent}
                    animeSlug={anime.slug}
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
