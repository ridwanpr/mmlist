interface VoteGroupProps {
  label: string;
  options: string[];
  selected: string | null;
  handleOptionChange: (option: string) => void;
}

const VoteGroup = ({
  label,
  options,
  selected,
  handleOptionChange,
}: VoteGroupProps) => {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3"
    >
      <span
        aria-hidden="true"
        className="text-text-muted w-32 shrink-0 text-[10px] font-medium tracking-widest uppercase"
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected === option}
              onClick={() => handleOptionChange(option)}
              className={`focus-visible:ring-border rounded-md border px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none ${
                selected === option
                  ? "border-primary bg-primary text-surface"
                  : "border-border text-text-muted hover:border-primary-dark hover:text-primary-dark bg-transparent"
              }`}
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
