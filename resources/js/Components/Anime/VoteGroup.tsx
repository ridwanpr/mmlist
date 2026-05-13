import type { VoteProps } from "./TriggerItem";

interface VoteGroupProps {
  label: string;
  options: string[];
  category: keyof VoteProps;
  votes: VoteProps;
  handleVoteChange: (category: keyof VoteProps, option: string) => void;
}

const VoteGroup = ({
  label,
  options,
  category,
  votes,
  handleVoteChange,
}: VoteGroupProps) => {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="text-text-muted w-32 shrink-0 text-[10px] font-medium tracking-widest uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          return (
            <button
              type="button"
              key={option}
              onClick={() => handleVoteChange(category, option)}
              className={`focus-visible:ring-border border-primary-soft text-primary hover:bg-primary rounded-md border px-3 py-1 text-xs font-medium transition-colors hover:cursor-pointer hover:text-white focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none ${votes[category] === option ? "bg-primary text-white" : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VoteGroup;
