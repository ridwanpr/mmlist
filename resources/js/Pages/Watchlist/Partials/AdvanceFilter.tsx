import type { SetStateAction } from 'react';
import type React from 'react';
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu';

type AdvanceFilterProps = {
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  isFilterOpen?: boolean;
  onToggleFilter?: () => void;
};

const AdvanceFilter = ({
  searchQuery,
  setSearchQuery,
  isFilterOpen = false,
  onToggleFilter,
}: AdvanceFilterProps) => {
  return (
    <div className="generic-search-wrapper mb-6 flex items-center justify-between gap-3 font-sans">
      {/* Search Input Group */}
      <div className="relative flex-1">
        <div className="text-text-muted/70 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <LuSearch className="h-4 w-4" />
        </div>
        <input
          value={searchQuery ?? ''}
          onChange={e => setSearchQuery(e.target.value)}
          type="text"
          className="border-border bg-surface text-text placeholder:text-text-muted/50 focus:border-primary focus:ring-primary-soft w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm transition-colors duration-200 focus:ring-2 focus:outline-hidden"
          placeholder="Search anime title..."
        />
      </div>

      {/* Advanced Filter Toggle Button */}
      <button
        onClick={onToggleFilter}
        type="button"
        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
          isFilterOpen
            ? 'border-primary bg-primary-soft text-primary'
            : 'border-border bg-surface text-text-muted hover:bg-surface-alt hover:text-text'
        } `}
      >
        <LuSlidersHorizontal
          className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-90' : ''}`}
        />
        <span>Advanced Filter</span>
      </button>
    </div>
  );
};

export default AdvanceFilter;
