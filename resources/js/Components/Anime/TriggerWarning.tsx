import { useMemo, useState } from "react";

import FilterButton from "./FilterButton";
import TriggerItem from "./TriggerItem";

const TriggerWarning = ({ triggers }: { triggers: App.DTOs.TriggerData[] }) => {
  const [filterTrigger, setFilterTrigger] = useState<string | number>("all");

  const handleFilterTrigger = (triggerId: string | number) => {
    setFilterTrigger(triggerId);
  };

  const filteredTriggers = useMemo(() => {
    if (filterTrigger === "all") {
      return triggers;
    }

    const selectedTrigger = triggers.filter(
      (trigger) => trigger.id === filterTrigger,
    );
    return selectedTrigger;
  }, [triggers, filterTrigger]);

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
        <section className="border-border bg-surface w-full self-start rounded-lg border p-2 lg:w-67.5">
          <div className="flex flex-col gap-1">
            <div className="px-2 py-1.5">
              <p className="text-text text-xs font-semibold tracking-widest uppercase">
                Category
              </p>
              <p className="text-text-muted mt-0.5 text-[11px]">
                Click to filter
              </p>
            </div>

            <div className="flex flex-col gap-0.5">
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

        {/*Trigger Content List*/}
        <section className="flex-1">
          {/*Trigger Content Header*/}
          {filterTrigger === "all" ? (
            <h2 className="text-text mb-4 font-semibold">
              Showing All Categories
            </h2>
          ) : (
            ""
          )}

          {filteredTriggers?.map((triggers) => (
            <div key={triggers.id}>
              <div className="border-primary my-4 border-l-2 px-2">
                <h2 className="text-text font-semibold">{triggers.name}</h2>
                <p className="text-text-muted text-sm">
                  {triggers?.description}
                </p>
              </div>
              {/*Trigger Content Item List*/}
              <div className="flex flex-col gap-4">
                {triggers?.triggerContents.map((triggerContent) => (
                  <TriggerItem
                    key={triggerContent.id}
                    triggerContent={triggerContent}
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
