import { LuInfo } from "react-icons/lu";

export const SideInfo = () => {
  return (
    <div className="min-w-0 lg:col-span-1">
      {/* Community Rating */}
      <div className="border-border bg-surface mb-4 rounded-lg border p-4">
        <p className="mb-2 font-semibold">Community Rating</p>
        <div className="mb-1 flex items-center gap-2">
          <p className="mb-2 text-2xl font-semibold text-red-500 md:text-3xl">
            Severe
          </p>
        </div>
        <p className="mb-2 text-sm">based on 2,842 votes</p>
        <p className="text-text/90 text-sm font-bold">What is this?</p>
        <p className="text-text/90 mb-2 text-sm">
          Our community reviews how frequent or intense a trigger appears. See
          trigger list for individual ratings.
        </p>
      </div>

      {/* At a Glance */}
      <div className="border-border bg-surface mb-4 rounded-lg border p-4">
        <div className="mb-4">
          <p className="text-text font-semibold">At a Glance</p>
        </div>

        <div className="flex flex-col gap-3">
          <div
            key="key"
            className="border-border/50 flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
          >
            <span className="text-text/90 text-sm font-medium">
              Trigger Name
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full`}></span>
              <span
                className={`text-[11px] font-bold tracking-wider uppercase`}
              >
                Label
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Advisory */}
      <div className="border-border bg-surface mb-4 rounded-lg border p-4">
        <div className="mb-4">
          <p className="text-text font-semibold">Content Advisory</p>
        </div>
        <p className="text-text/90 text-sm text-pretty">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
          ratione eveniet excepturi sint, sit, inventore necessitatibus tempore
          dolorum delectus aliquam earum dolor nam culpa tenetur laborum! Porro
          non eius nisi!
        </p>
        <p className="text-text-muted mt-1 flex items-center gap-1 text-xs">
          <LuInfo /> AI Generated
        </p>
      </div>
    </div>
  );
};
