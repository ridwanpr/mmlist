import { LuInfo, LuUsers } from "react-icons/lu";

export const SideInfo = () => {
  return (
    <div className="flex min-w-0 flex-col gap-4 lg:col-span-1">
      {/* 1. AI Content Advisory */}
      <div className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-text flex items-center gap-2 font-bold">
            Content Advisory
          </h3>
          <span className="flex shrink-0 items-center gap-1 rounded bg-blue-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-blue-500 uppercase">
            <LuInfo size={12} />
            AI Powered
          </span>
        </div>
        <p className="text-text/90 text-sm leading-relaxed text-pretty">
          This series is a dark fantasy that relies heavily on graphic violence
          and psychological manipulation. Viewers should expect recurring
          instances of body horror, extreme physical trauma, and bleak themes
          regarding human survival. The narrative frequently places young
          characters in highly distressing situations.
        </p>
      </div>

      <div className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-text flex items-center gap-2 font-bold">
            Trigger Profile
          </h3>
          <p className="text-text-muted mt-1 text-xs text-pretty">
            Active triggers currently reported by the community.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">
              Extreme / Severe
            </span>
            <span className="text-xs font-bold">4 items</span>
          </div>
          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Moderate</span>
            <span className="text-xs font-bold">7 items</span>
          </div>
          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Mild</span>
            <span className="text-xs font-bold">2 items</span>
          </div>
        </div>
      </div>

      <div className="border-primary/20 bg-primary/5 rounded-lg border p-5 text-center shadow-sm">
        <div className="bg-primary/10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
          <LuUsers className="text-primary" size={20} />
        </div>
        <h3 className="text-text mb-1 font-bold">Help the Community</h3>
        <p className="text-text-muted mb-4 text-xs leading-relaxed">
          Did we miss something? Your votes keep this database accurate and help
          other viewers stay safe.
        </p>
        <button className="bg-primary focus:ring-primary w-full rounded-md py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none">
          Suggest a Trigger
        </button>
      </div>
    </div>
  );
};
