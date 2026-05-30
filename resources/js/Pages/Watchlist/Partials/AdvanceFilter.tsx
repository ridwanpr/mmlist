import { useState } from 'react';
import type { SetStateAction } from 'react';
import type React from 'react';
import {
  LuSearch,
  LuSlidersHorizontal,
  LuCalendar,
  LuSparkles,
  LuClapperboard,
  LuBuilding,
  LuTv,
} from 'react-icons/lu';

type AdvanceFilterProps = {
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
};

const AdvanceFilter = ({ searchQuery, setSearchQuery }: AdvanceFilterProps) => {
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form pipeline.');
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-6 font-sans">
      {/* Top Bar: Primary Controls */}
      <div className="generic-search-wrapper flex items-center justify-between gap-2">
        {/* Search Input Group */}
        <div className="relative flex-1">
          <div className="text-text-muted/70 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <LuSearch className="h-4 w-4" />
          </div>
          <input
            value={searchQuery ?? ''}
            onChange={e => setSearchQuery(e.target.value)}
            type="text"
            className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/50 w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm outline-hidden transition-colors"
            placeholder="Search anime title..."
          />
        </div>

        {/* Configuration Toggle Button */}
        <button
          onClick={() => setShowAdvanceFilter(!showAdvanceFilter)}
          type="button"
          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
            showAdvanceFilter
              ? 'border-primary bg-primary-soft text-primary'
              : 'border-border bg-surface-alt text-text-muted hover:text-text'
          }`}
        >
          <LuSlidersHorizontal
            className={`h-4 w-4 transition-transform duration-200 ${showAdvanceFilter ? 'rotate-90' : ''}`}
          />
          <span className="hidden sm:inline">Filters</span>
        </button>

        {/* Main Action Button */}
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-surface cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap shadow-xs transition-colors active:scale-[0.98]"
        >
          Search
        </button>
      </div>

      {/* Inline Configuration Panel */}
      <div
        className={`border-border bg-surface mt-4 overflow-hidden rounded-lg border shadow-xs transition-all duration-300 ${
          showAdvanceFilter
            ? 'max-h-500 p-4 opacity-100'
            : 'pointer-events-none max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="space-y-4">
          {/* Section 1: Watched Date Range */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuCalendar className="text-primary size-4" />
              <span>Watched Date Range</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-xs whitespace-nowrap">From:</span>
                <input
                  type="date"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-xs whitespace-nowrap">To:</span>
                <input
                  type="date"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Airing Year */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuClapperboard className="text-primary size-4" />
              <span>Airing Year</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-xs whitespace-nowrap">From:</span>
                <input
                  type="number"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-xs whitespace-nowrap">To:</span>
                <input
                  type="number"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Flat Genres & Themes List */}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="text-text flex items-center gap-1.5 font-serif text-sm font-medium">
                <LuSparkles className="text-primary size-4" />
                <span>Genres & Themes</span>
              </label>
              <span className="text-text-muted text-[11px]">
                Click once to include (+), twice to exclude (-)
              </span>
            </div>
            <div className="border-border/40 bg-surface-alt/40 flex flex-wrap gap-2 rounded-xl border p-3">
              <div className="text-text-muted text-xs italic select-none">
                Loading genres and themes...
              </div>
            </div>
          </div>

          {/* Section 4: Studios */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuBuilding className="text-primary size-4" />
              <span>Idols & Studios</span>
            </label>
            <input
              type="text"
              className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/50 w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
              placeholder="Search studios..."
            />
          </div>

          {/* Section 5: Producers */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuTv className="text-primary size-4" />
              <span>Producers</span>
            </label>
            <input
              type="text"
              className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/50 w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
              placeholder="Search producers..."
            />
          </div>

          {/* Utility Footer inside container */}
          <div className="border-border/60 flex items-center justify-end border-t pt-3">
            <button
              onClick={handleClearAllFilters}
              type="button"
              className="text-text-muted hover:bg-accent-red/10 border-border bg-surface-alt inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:cursor-pointer"
            >
              Reset Form Fields
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdvanceFilter;
