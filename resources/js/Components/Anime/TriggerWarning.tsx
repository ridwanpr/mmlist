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
      <div className="mx-auto mt-4 flex flex-col lg:flex-row max-w-7xl gap-4">
        {/*Trigger Category Filter*/}
        <section className="border-border bg-surface w-full lg:w-67.5 rounded-lg border p-2">
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <h2 className="text-text/90 text-sm font-semibold">
                Filter by Category
              </h2>
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
        <section className="flex-1"></section>
      </div>
    </>
  );
};

export default TriggerWarning;
