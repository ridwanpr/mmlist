import { LuChevronDown, LuThumbsDown, LuThumbsUp } from "react-icons/lu";

interface TriggerItemProps {
  triggerContent: App.DTOs.TriggerContentData;
}

const TriggerItem = ({ triggerContent }: TriggerItemProps) => {
  return (
    <div>
      <div className="border-border bg-surface flex w-full flex-col gap-4 self-start rounded-lg border p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
        {/* Left */}
        <div className="min-w-0 sm:min-w-40 sm:flex-1">
          <p className="text-sm font-semibold">{triggerContent.name}</p>
          <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
            {triggerContent?.description}
          </p>
        </div>

        {/* Middle — Severity & Framing */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Severity */}
          <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
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
          <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
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
        <div className="flex items-center justify-between sm:shrink-0 sm:justify-normal sm:gap-4">
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
    </div>
  );
};

export default TriggerItem;
