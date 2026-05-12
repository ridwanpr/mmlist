interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`w-full rounded px-2.5 py-2 text-left text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary-soft text-primary-dark"
        : "text-text-muted hover:bg-surface-alt hover:text-text"
    }`}
  >
    {label}
  </button>
);

export default FilterButton;
