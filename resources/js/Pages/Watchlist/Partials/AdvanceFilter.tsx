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
  LuDatabase,
} from 'react-icons/lu';

type AdvanceFilterProps = {
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  masterFilter: {
    genres: App.DTOs.GenreData[];
    themes: App.DTOs.ThemeData[];
    year: number[];
    type: string[];
    season: string[];
    rating: string[];
  };
};

type FilterStatus = 'include' | 'exclude';

const getBadgeStyles = (status?: FilterStatus) => {
  if (status === 'include') {
    return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
  }
  if (status === 'exclude') {
    return 'border-rose-500 bg-rose-500/10 text-rose-400';
  }
  return 'border-border bg-surface-alt text-text-muted hover:text-text';
};

const AdvanceFilter = ({ searchQuery, setSearchQuery, masterFilter }: AdvanceFilterProps) => {
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
  const [genreStates, setGenreStates] = useState<Record<number, FilterStatus>>({});
  const [themeStates, setThemeStates] = useState<Record<number, FilterStatus>>({});

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form pipeline.');
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setGenreStates({});
    setThemeStates({});
  };

  const handleToggleFilter = (id: number, field: 'genres' | 'themes') => {
    const setTarget = field === 'genres' ? setGenreStates : setThemeStates;

    setTarget(prev => {
      const next = { ...prev };
      const currentStatus = next[id];

      if (!currentStatus) {
        next[id] = 'include';
      } else if (currentStatus === 'include') {
        next[id] = 'exclude';
      } else {
        delete next[id];
      }

      return next;
    });
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
          {/* Watched Date Range */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuCalendar className="text-primary size-4" />
              <span>Watched Date Range</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">From</span>
                <input
                  type="date"
                  name="from_watched"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">To</span>
                <input
                  type="date"
                  name="to_watched"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Airing Year */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuClapperboard className="text-primary size-4" />
              <span>Anime Year</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">From</span>
                <select
                  name="from_airing"
                  id="from_airing"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  {masterFilter.year.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">To</span>
                <select
                  name="to_airing"
                  id="to_airing"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  {masterFilter.year.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Season & Type */}
          <div>
            <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuDatabase className="text-primary size-4" />
              <span>Season & Type</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">Season</span>
                <select
                  name="season"
                  id="season"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs uppercase outline-hidden transition-colors"
                >
                  {masterFilter.season.map(season => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">Type</span>
                <select
                  name="type"
                  id="type"
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  {masterFilter.type.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="text-text flex items-center gap-1.5 font-serif text-sm font-medium">
                <LuSparkles className="text-primary size-4" />
                <span>Genres</span>
              </label>
              <span className="text-text-muted text-[11px]">
                Click once to include (+), twice to exclude (-)
              </span>
            </div>
            <div className="border-border bg-surface-alt/40 max-h-36 overflow-y-auto rounded-xl border p-3">
              <div className="flex flex-wrap gap-2">
                {masterFilter.genres.map(genre => {
                  const status = genreStates[genre.id];
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => handleToggleFilter(genre.id, 'genres')}
                      className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${getBadgeStyles(status)}`}
                    >
                      {status === 'include' && '+ '}
                      {status === 'exclude' && '- '}
                      {genre.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Themes */}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="text-text flex items-center gap-1.5 font-serif text-sm font-medium">
                <LuSparkles className="text-primary size-4" />
                <span>Themes</span>
              </label>
              <span className="text-text-muted text-[11px]">
                Click once to include (+), twice to exclude (-)
              </span>
            </div>
            <div className="border-border bg-surface-alt/40 max-h-48 overflow-y-auto rounded-xl border p-3">
              <div className="flex flex-wrap gap-2">
                {masterFilter.themes.map(theme => {
                  const status = themeStates[theme.id];
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleToggleFilter(theme.id, 'themes')}
                      className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${getBadgeStyles(status)}`}
                    >
                      {status === 'include' && '+ '}
                      {status === 'exclude' && '- '}
                      {theme.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Studios */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuBuilding className="text-primary size-4" />
              <span>Studios</span>
            </label>
            <input
              type="text"
              name="studio"
              className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/50 w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
              placeholder="Search studios..."
            />
          </div>

          {/* Producers */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text flex items-center gap-1.5 font-serif text-sm font-medium">
              <LuTv className="text-primary size-4" />
              <span>Producers</span>
            </label>
            <input
              type="text"
              name="producer"
              className="border-border bg-surface-alt text-text focus:border-accent-gold placeholder:text-text-muted/50 w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
              placeholder="Search producers..."
            />
          </div>

          {/* Footer */}
          <div className="border-border/60 flex items-center justify-end gap-2 border-t pt-3">
            <button
              onClick={handleClearAllFilters}
              type="button"
              className="text-text-muted hover:bg-accent-red/10 border-border bg-surface-alt inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:cursor-pointer"
            >
              Reset Form Fields
            </button>
            <button
              type="button"
              className="bg-primary hover:bg-primary-dark text-surface inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-medium tracking-wide shadow-xs transition-colors hover:cursor-pointer"
            >
              Save to Custom List
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdvanceFilter;
