interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors hover:cursor-pointer focus:outline-none ${
      isActive
        ? "bg-primary-soft text-primary-dark font-semibold"
        : "text-text-muted hover:bg-surface-alt hover:text-text font-medium"
    }`}
  >
    {label}
  </button>
);

export default FilterButton;
