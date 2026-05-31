import { useState, useEffect } from 'react';
import {
  LuFlame,
  LuTv,
  LuCalendar,
  LuSlidersHorizontal,
  LuSparkles,
  LuClapperboard,
  LuDatabase,
  LuSearch,
  LuTriangleAlert,
} from 'react-icons/lu';
import { router } from '@inertiajs/react';

interface SearchSectionProps {
  genres: { id: number; name: string }[];
  themes: { id: number; name: string }[];
  triggerContents: { id: number; name: string }[];
  year: number[];
  type: string[];
  season: string[];
  rating: string[];
  filters: {
    query: string;
    from_airing: string;
    to_airing: string;
    season: string;
    type: string;
    rating: string;
    genres_include: string;
    genres_exclude: string;
    themes_include: string;
    themes_exclude: string;
    triggers_include: string;
    triggers_exclude: string;
  };
}

type FilterStatus = 'include' | 'exclude';

const QUICK_ACTIONS = [
  { label: 'Currently Airing', id: 'ongoing', icon: <LuTv size={16} className="text-blue-500" /> },
  { label: 'Top Anime', id: 'top', icon: <LuFlame size={16} className="text-orange-500" /> },
  { label: 'Upcoming', id: 'upcoming', icon: <LuCalendar size={16} className="text-green-500" /> },
];

const getBadgeStyles = (status?: FilterStatus) => {
  if (status === 'include') return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
  if (status === 'exclude') return 'border-rose-500 bg-rose-500/10 text-rose-400';
  return 'border-border bg-surface-alt text-text-muted hover:text-text';
};

const SearchSection = ({
  genres,
  themes,
  triggerContents,
  year,
  type,
  season,
  rating,
  filters,
}: SearchSectionProps) => {
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [fromAiring, setFromAiring] = useState('');
  const [toAiring, setToAiring] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const [genreStates, setGenreStates] = useState<Record<number, FilterStatus>>({});
  const [themeStates, setThemeStates] = useState<Record<number, FilterStatus>>({});
  const [triggerStates, setTriggerStates] = useState<Record<number, FilterStatus>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setSearchQuery(params.get('query') || filters.query || '');
    setFromAiring(params.get('from_airing') || filters.from_airing || '');
    setToAiring(params.get('to_airing') || filters.to_airing || '');
    setSelectedSeason(params.get('season') || filters.season || '');
    setSelectedType(params.get('type') || filters.type || '');
    setSelectedRating(params.get('rating') || filters.rating || '');

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

    const initialTriggers: Record<number, FilterStatus> = {};
    parseArrayParam('triggers_include').forEach(id => (initialTriggers[Number(id)] = 'include'));
    parseArrayParam('triggers_exclude').forEach(id => (initialTriggers[Number(id)] = 'exclude'));
    setTriggerStates(initialTriggers);
  }, [filters]);

  const handleToggleFilter = (id: number, field: 'genres' | 'themes' | 'triggers') => {
    const map = { genres: setGenreStates, themes: setThemeStates, triggers: setTriggerStates };
    const setTarget = map[field];

    setTarget(prev => {
      const next = { ...prev };
      const currentStatus = next[id];
      if (!currentStatus) next[id] = 'include';
      else if (currentStatus === 'include') next[id] = 'exclude';
      else delete next[id];
      return next;
    });
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'ongoing') {
      router.get('/browse?airing=true');
    } else if (actionId === 'top') {
      router.get('/browse?sort=score&order=desc');
    } else if (actionId === 'upcoming') {
      router.get('/browse?upcoming=true');
    }
  };

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentParams = new URLSearchParams(window.location.search);

    const params: Record<string, any> = {
      query: searchQuery || undefined,
      sort: currentParams.get('sort') || undefined,
      order: currentParams.get('order') || undefined,
      from_airing: fromAiring || undefined,
      to_airing: toAiring || undefined,
      season: selectedSeason || undefined,
      type: selectedType || undefined,
      rating: selectedRating || undefined,
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
    const triggersInclude = Object.keys(triggerStates).filter(
      id => triggerStates[Number(id)] === 'include',
    );
    const triggersExclude = Object.keys(triggerStates).filter(
      id => triggerStates[Number(id)] === 'exclude',
    );

    if (genresInclude.length) params.genres_include = genresInclude.join(',');
    if (genresExclude.length) params.genres_exclude = genresExclude.join(',');
    if (themesInclude.length) params.themes_include = themesInclude.join(',');
    if (themesExclude.length) params.themes_exclude = themesExclude.join(',');
    if (triggersInclude.length) params.triggers_include = triggersInclude.join(',');
    if (triggersExclude.length) params.triggers_exclude = triggersExclude.join(',');

    setShowAdvanceFilter(false);
    router.get('/browse', params, { preserveState: true, preserveScroll: true });
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setGenreStates({});
    setThemeStates({});
    setTriggerStates({});
    setFromAiring('');
    setToAiring('');
    setSelectedSeason('');
    setSelectedType('');
    setSelectedRating('');

    router.get('/browse', {}, { preserveState: true, preserveScroll: true });
  };

  return (
    <div className="bg-surface border-border border-b font-sans">
      <div className="mx-auto max-w-7xl p-4 lg:pt-4">
        <h1 className="text-text mb-2 font-serif text-2xl font-bold">Browse Anime</h1>
        <p className="text-text-muted mb-4">
          Find anime and view trigger warnings to make informed choices.
        </p>

        <form onSubmit={handleApplyFilter}>
          <div className="generic-search-wrapper mb-3 flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <div className="text-text-muted/70 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <LuSearch className="h-4 w-4" />
              </div>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                type="text"
                className="border-border bg-surface-alt text-text focus:border-primary placeholder:text-text-muted/50 w-full rounded-xl border-2 py-2.5 pr-4 pl-10 text-sm outline-hidden transition-colors"
                placeholder="Search anime... e.g., Your Name / Kimi no Na wa / 君の名は"
              />
            </div>

            <button
              onClick={() => setShowAdvanceFilter(!showAdvanceFilter)}
              type="button"
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${showAdvanceFilter ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface-alt text-text-muted hover:text-text'}`}
            >
              <LuSlidersHorizontal
                className={`h-4 w-4 transition-transform duration-200 ${showAdvanceFilter ? 'rotate-90' : ''}`}
              />
              <span className="hidden sm:inline">Filters</span>
            </button>

            <button
              type="submit"
              className={`bg-primary text-surface cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap shadow-xs transition-all hover:brightness-110 active:scale-[0.98] ${showAdvanceFilter ? 'hidden md:inline-block' : 'inline-block'}`}
            >
              Search
            </button>
          </div>

          <div className="relative">
            <div className="flex w-full snap-x scrollbar-none gap-2 overflow-x-auto pb-2 whitespace-nowrap sm:gap-4 sm:px-0">
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleQuickAction(action.id)}
                  className="border-border text-text-muted hover:border-primary hover:text-text flex shrink-0 snap-start items-center gap-2 rounded-full border bg-transparent px-4 py-1.5 text-sm font-medium transition-all hover:cursor-pointer active:scale-95"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`bg-surface overflow-hidden rounded-lg shadow-xs transition-all duration-150 ${showAdvanceFilter ? 'border-border mt-4 max-h-350 border p-4 opacity-100' : 'pointer-events-none mt-0 max-h-0 border-0 p-0 opacity-0'}`}
          >
            <div className="space-y-4">
              {/* Anime Year */}
              <div>
                <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
                  <LuClapperboard className="text-primary size-4" />
                  <span>Anime Year</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={fromAiring}
                    onChange={e => setFromAiring(e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-primary w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                  >
                    <option value="">From (Any)</option>
                    {year.map(yr => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                  <select
                    value={toAiring}
                    onChange={e => setToAiring(e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-primary w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                  >
                    <option value="">To (Any)</option>
                    {year.map(yr => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <label className="text-text mb-2 flex items-center gap-1.5 font-serif text-sm font-medium">
                  <LuDatabase className="text-primary size-4" />
                  <span>Specifications</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={selectedSeason}
                    onChange={e => setSelectedSeason(e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-primary w-full rounded-xl border px-3 py-2 text-xs uppercase outline-hidden transition-colors"
                  >
                    <option value="">All Seasons</option>
                    {season.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-primary w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                  >
                    <option value="">All Types</option>
                    {type.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedRating}
                    onChange={e => setSelectedRating(e.target.value)}
                    className="border-border bg-surface-alt text-text focus:border-primary w-full rounded-xl border px-3 py-2 text-xs outline-hidden transition-colors"
                  >
                    <option value="">All Ratings</option>
                    {rating.map(r => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
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
                    {genres.map(genre => {
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
                    {themes.map(theme => {
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

              {/* Trigger Warnings Grid Block */}
              <div>
                <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
                  {/* Stacks label and disclaimer neatly on the left */}
                  <div className="flex flex-col gap-0.5">
                    <label className="text-text flex items-center gap-1.5 font-serif text-sm font-medium">
                      <LuTriangleAlert className="text-primary size-4" />
                      <span>Trigger Content Flags</span>
                    </label>
                    <span className="text-text-muted text-[11px]">
                      AI flags are used until community data grows. Accuracy may vary.
                    </span>
                  </div>

                  {/* Interactive instructions on the right */}
                  <span className="text-text-muted text-[11px] sm:text-right">
                    Click once to filter by warning (+), twice to completely exclude (-)
                  </span>
                </div>
                <div className="border-border bg-surface-alt/40 max-h-48 overflow-y-auto rounded-xl border p-3">
                  <div className="flex flex-wrap gap-2">
                    {triggerContents.map(trigger => {
                      const status = triggerStates[trigger.id];
                      return (
                        <button
                          key={trigger.id}
                          type="button"
                          onClick={() => handleToggleFilter(trigger.id, 'triggers')}
                          className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${getBadgeStyles(status)}`}
                        >
                          {status === 'include' && '+ '}
                          {status === 'exclude' && '- '}
                          {trigger.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-border/60 flex items-center justify-end gap-2 border-t pt-3">
                <button
                  onClick={handleClearAllFilters}
                  type="button"
                  className="text-text-muted border-border bg-surface-alt inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-medium tracking-wide transition-colors hover:cursor-pointer hover:bg-rose-500/10"
                >
                  Reset Form Fields
                </button>
                <button
                  type="submit"
                  className="bg-primary text-surface inline-flex cursor-pointer items-center justify-center rounded-xl px-5 py-2 text-xs font-medium tracking-wide shadow-xs transition-colors hover:brightness-110 active:scale-[0.98]"
                >
                  Apply Filters & Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
