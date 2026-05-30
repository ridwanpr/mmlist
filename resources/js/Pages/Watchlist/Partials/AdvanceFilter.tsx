import { useState, useEffect } from 'react';
import type { SetStateAction } from 'react';
import type React from 'react';
import { router } from '@inertiajs/react';
import {
  LuSearch,
  LuSlidersHorizontal,
  LuCalendar,
  LuSparkles,
  LuClapperboard,
  LuDatabase,
  LuStar,
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

const SCORE_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const getBadgeStyles = (status?: FilterStatus) => {
  if (status === 'include') return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
  if (status === 'exclude') return 'border-rose-500 bg-rose-500/10 text-rose-400';
  return 'border-border bg-surface-alt text-text-muted hover:text-text';
};

const AdvanceFilter = ({ searchQuery, setSearchQuery, masterFilter }: AdvanceFilterProps) => {
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);

  const [fromWatched, setFromWatched] = useState('');
  const [toWatched, setToWatched] = useState('');
  const [fromAiring, setFromAiring] = useState('');
  const [toAiring, setToAiring] = useState('');
  const [season, setSeason] = useState('');
  const [type, setType] = useState('');
  const [fromScore, setFromScore] = useState('');
  const [toScore, setToScore] = useState('');

  const [genreStates, setGenreStates] = useState<Record<number, FilterStatus>>({});
  const [themeStates, setThemeStates] = useState<Record<number, FilterStatus>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFromWatched(params.get('from_watched') || '');
    setToWatched(params.get('to_watched') || '');
    setFromAiring(params.get('from_airing') || '');
    setToAiring(params.get('to_airing') || '');
    setSeason(params.get('season') || '');
    setType(params.get('type') || '');
    setFromScore(params.get('from_score') || '');
    setToScore(params.get('to_score') || '');

    const parseArrayParam = (key: string) => {
      const val = params.get(key);
      return val ? val.split(',') : [];
    };

    const initialGenres: Record<number, FilterStatus> = {};
    parseArrayParam('genres_include').forEach(id => (initialGenres[Number(id)] = 'include'));
    parseArrayParam('genres_exclude').forEach(id => (initialGenres[Number(id)] = 'exclude'));
    setGenreStates(initialGenres);

    const initialThemes: Record<number, FilterStatus> = {};
    parseArrayParam('themes_include').forEach(id => (initialThemes[Number(id)] = 'include'));
    parseArrayParam('themes_exclude').forEach(id => (initialThemes[Number(id)] = 'exclude'));
    setThemeStates(initialThemes);
  }, []);

  const handleToggleFilter = (id: number, field: 'genres' | 'themes') => {
    const setTarget = field === 'genres' ? setGenreStates : setThemeStates;
    setTarget(prev => {
      const next = { ...prev };
      const currentStatus = next[id];
      if (!currentStatus) next[id] = 'include';
      else if (currentStatus === 'include') next[id] = 'exclude';
      else delete next[id];
      return next;
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(window.location.search);

    const params: Record<string, any> = {
      search: searchQuery || undefined,
      status: currentParams.get('status') || undefined,
      sort: currentParams.get('sort') || undefined,
      from_watched: fromWatched || undefined,
      to_watched: toWatched || undefined,
      from_airing: fromAiring || undefined,
      to_airing: toAiring || undefined,
      season: season || undefined,
      type: type || undefined,
      from_score: fromScore || undefined,
      to_score: toScore || undefined,
    };

    const genresInclude = Object.keys(genreStates).filter(
      id => genreStates[Number(id)] === 'include',
    );
    const genresExclude = Object.keys(genreStates).filter(
      id => genreStates[Number(id)] === 'exclude',
    );
    const themesInclude = Object.keys(themeStates).filter(
      id => themeStates[Number(id)] === 'include',
    );
    const themesExclude = Object.keys(themeStates).filter(
      id => themeStates[Number(id)] === 'exclude',
    );

    if (genresInclude.length) params.genres_include = genresInclude.join(',');
    if (genresExclude.length) params.genres_exclude = genresExclude.join(',');
    if (themesInclude.length) params.themes_include = themesInclude.join(',');
    if (themesExclude.length) params.themes_exclude = themesExclude.join(',');

    setShowAdvanceFilter(false);
    router.get(window.location.pathname, params, { preserveState: true, preserveScroll: true });
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setGenreStates({});
    setThemeStates({});
    setFromWatched('');
    setToWatched('');
    setFromAiring('');
    setToAiring('');
    setSeason('');
    setType('');
    setFromScore('');
    setToScore('');

    const currentParams = new URLSearchParams(window.location.search);
    router.get(
      window.location.pathname,
      {
        status: currentParams.get('status') || undefined,
        sort: currentParams.get('sort') || undefined,
      },
      { preserveState: true, preserveScroll: true },
    );
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-6 font-sans">
      <div className="generic-search-wrapper flex items-center justify-between gap-2">
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

        <button
          type="submit"
          className={`bg-primary hover:bg-primary-dark text-surface cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap shadow-xs transition-colors active:scale-[0.98] ${showAdvanceFilter ? 'hidden md:inline-block' : 'inline-block'}`}
        >
          Search
        </button>
      </div>

      <div
        className={`bg-surface overflow-hidden rounded-lg shadow-xs transition-all duration-150 ${showAdvanceFilter ? 'border-border mt-4 max-h-250 border p-4 opacity-100' : 'pointer-events-none mt-0 max-h-0 border-0 p-0 opacity-0'}`}
      >
        <div className="space-y-4">
          {/* Watched Date Range Row */}
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
                  value={fromWatched}
                  onChange={e => setFromWatched(e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-muted text-xs font-medium">To</span>
                <input
                  type="date"
                  value={toWatched}
                  onChange={e => setToWatched(e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Grid for Year and Personal Score parameters */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Airing Year */}
            <div>
              <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
                <LuClapperboard className="text-primary size-4" />
                <span>Anime Year</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={fromAiring}
                  onChange={e => setFromAiring(e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  <option value="">From (Any)</option>
                  {masterFilter.year.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={toAiring}
                  onChange={e => setToAiring(e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  <option value="">To (Any)</option>
                  {masterFilter.year.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Personal Score Filtration Inputs */}
            <div>
              <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
                <LuStar className="text-primary size-4 animate-pulse" />
                <span>Personal Score Range</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={fromScore}
                  onChange={e => setFromScore(e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  <option value="">Min Score (Any)</option>
                  {SCORE_LABELS.map(score => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
                <select
                  value={toScore}
                  onChange={e => setToScore(e.target.value)}
                  className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                >
                  <option value="">Max Score (Any)</option>
                  {SCORE_LABELS.map(score => (
                    <option key={score} value={score}>
                      {score}
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
              <select
                value={season}
                onChange={e => setSeason(e.target.value)}
                className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs uppercase outline-hidden transition-colors"
              >
                <option value="">All Seasons</option>
                {masterFilter.season.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="border-border bg-surface-alt text-text focus:border-accent-gold w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
              >
                <option value="">All Types</option>
                {masterFilter.type.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Genres Badge Grid */}
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

          {/* Themes Badge Grid */}
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

          {/* Footer Panel Controls */}
          <div className="border-border/60 flex items-center justify-end gap-2 border-t pt-3">
            <button
              onClick={handleClearAllFilters}
              type="button"
              className="text-text-muted hover:bg-accent-red/10 border-border bg-surface-alt inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:cursor-pointer"
            >
              Reset Form Fields
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-surface inline-flex cursor-pointer items-center justify-center rounded-xl px-5 py-2 text-xs font-medium tracking-wide shadow-xs transition-colors active:scale-[0.98]"
            >
              Apply Filters & Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdvanceFilter;
