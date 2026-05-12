import { useMemo, useState } from "react";

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
        <section className="border-border bg-surface self-start w-full rounded-lg border p-2 lg:w-67.5">
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <p className="text-text/90 text-sm font-semibold">
                Filter by Category
              </p>
              <p className="text-text-muted text-xs">Click to filter</p>
            </div>
            <button
              onClick={() => handleFilterTrigger("all")}
              className="bg-surface-alt hover:bg-primary-soft text-text w-full rounded p-2 text-center text-sm font-medium hover:cursor-pointer"
            >
              All Category
            </button>
            {triggers?.map((trigger) => (
              <button
                key={trigger.id}
                onClick={() => handleFilterTrigger(trigger.id)}
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
