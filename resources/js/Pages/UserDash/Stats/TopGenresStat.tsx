type TopGenresStatProps = {
  topGenres: Array<{ name: string; count: number }>;
};

const GENRE_THEMES = {
  Action: {
    text: 'text-red-400 dark:text-red-300',
    bg: 'bg-red-500/5 dark:bg-red-400/5',
    border: 'hover:border-red-500/30 dark:hover:border-red-400/20',
  },
  Horror: {
    text: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-600/5 dark:bg-red-500/5',
    border: 'hover:border-red-600/30 dark:hover:border-red-500/20',
  },
  Romance: {
    text: 'text-rose-400 dark:text-rose-300',
    bg: 'bg-rose-500/5 dark:bg-rose-400/5',
    border: 'hover:border-rose-500/30 dark:hover:border-rose-400/20',
  },
  'Boys Love': {
    text: 'text-pink-400 dark:text-pink-300',
    bg: 'bg-pink-500/5 dark:bg-pink-400/5',
    border: 'hover:border-pink-500/30 dark:hover:border-pink-400/20',
  },
  'Girls Love': {
    text: 'text-rose-400 dark:text-rose-300',
    bg: 'bg-rose-500/5 dark:bg-rose-400/5',
    border: 'hover:border-rose-500/30 dark:hover:border-rose-400/20',
  },
  Drama: {
    text: 'text-indigo-400 dark:text-indigo-300',
    bg: 'bg-indigo-500/5 dark:bg-indigo-400/5',
    border: 'hover:border-indigo-500/30 dark:hover:border-indigo-400/20',
  },
  'Slice of Life': {
    text: 'text-sky-400 dark:text-sky-300',
    bg: 'bg-sky-500/5 dark:bg-sky-400/5',
    border: 'hover:border-sky-500/30 dark:hover:border-sky-400/20',
  },
  Suspense: {
    text: 'text-purple-400 dark:text-purple-300',
    bg: 'bg-purple-500/5 dark:bg-purple-400/5',
    border: 'hover:border-purple-500/30 dark:hover:border-purple-400/20',
  },
  Mystery: {
    text: 'text-violet-400 dark:text-violet-300',
    bg: 'bg-violet-500/5 dark:bg-violet-400/5',
    border: 'hover:border-violet-500/30 dark:hover:border-violet-400/20',
  },
  Supernatural: {
    text: 'text-fuchsia-400 dark:text-fuchsia-300',
    bg: 'bg-fuchsia-500/5 dark:bg-fuchsia-400/5',
    border: 'hover:border-fuchsia-500/30 dark:hover:border-fuchsia-400/20',
  },
  Ecchi: {
    text: 'text-pink-500 dark:text-pink-400',
    bg: 'bg-pink-500/5 dark:bg-pink-400/5',
    border: 'hover:border-pink-500/30 dark:hover:border-pink-400/20',
  },
  Erotica: {
    text: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-600/5 dark:bg-purple-500/5',
    border: 'hover:border-purple-600/30 dark:hover:border-purple-500/20',
  },
  Hentai: {
    text: 'text-fuchsia-500 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-600/5 dark:bg-fuchsia-500/5',
    border: 'hover:border-fuchsia-600/30 dark:hover:border-fuchsia-500/20',
  },
  Comedy: {
    text: 'text-amber-500 dark:text-amber-300',
    bg: 'bg-amber-500/5 dark:bg-amber-400/5',
    border: 'hover:border-amber-500/30 dark:hover:border-amber-400/20',
  },
  Gourmet: {
    text: 'text-orange-400 dark:text-orange-300',
    bg: 'bg-orange-500/5 dark:bg-orange-400/5',
    border: 'hover:border-orange-500/30 dark:hover:border-orange-400/20',
  },
  'Award Winning': {
    text: 'text-yellow-500 dark:text-yellow-400',
    bg: 'bg-yellow-500/5 dark:bg-yellow-400/5',
    border: 'hover:border-yellow-500/30 dark:hover:border-yellow-400/20',
  },
  Fantasy: {
    text: 'text-emerald-400 dark:text-emerald-300',
    bg: 'bg-emerald-500/5 dark:bg-emerald-400/5',
    border: 'hover:border-emerald-500/30 dark:hover:border-emerald-400/20',
  },
  Adventure: {
    text: 'text-teal-400 dark:text-teal-300',
    bg: 'bg-teal-500/5 dark:bg-teal-400/5',
    border: 'hover:border-teal-500/30 dark:hover:border-teal-400/20',
  },
  Sports: {
    text: 'text-green-400 dark:text-green-300',
    bg: 'bg-green-500/5 dark:bg-green-400/5',
    border: 'hover:border-green-500/30 dark:hover:border-green-400/20',
  },
  'Sci-Fi': {
    text: 'text-cyan-400 dark:text-cyan-300',
    bg: 'bg-cyan-500/5 dark:bg-cyan-400/5',
    border: 'hover:border-cyan-500/30 dark:hover:border-cyan-400/20',
  },
  'Avant Garde': {
    text: 'text-zinc-400 dark:text-zinc-300',
    bg: 'bg-zinc-500/5 dark:bg-zinc-400/5',
    border: 'hover:border-zinc-500/30 dark:hover:border-zinc-400/20',
  },

  Default: {
    text: 'text-accent-rose',
    bg: 'bg-surface-alt/40',
    border: 'hover:border-accent-rose/30',
  },
} satisfies Record<string, { text: string; bg: string; border: string }>;

const TopGenresStat = ({ topGenres }: TopGenresStatProps) => {
  if (!topGenres || topGenres.length === 0) return null;

  return (
    <div className="mb-3 px-3 lg:mt-5 lg:mb-0 lg:p-0">
      <div className="bg-surface border-border rounded-lg border p-4 shadow-xs">
        <h3 className="text-text-muted mb-4 text-xs font-bold tracking-wider uppercase">
          Top Genres
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {topGenres.map((genre, index) => {
            const theme =
              GENRE_THEMES[genre.name as keyof typeof GENRE_THEMES] ?? GENRE_THEMES.Default;

            return (
              <div
                key={genre.name}
                className={`border-border/60 flex flex-col justify-between rounded-lg border p-3 transition-all ${theme.bg} ${theme.border}`}
              >
                <span className={`text-xs font-bold tracking-tight ${theme.text}`}>
                  #{index + 1}
                </span>

                <div className="mt-4 min-w-0">
                  <p className="text-text truncate text-sm font-extrabold tracking-tight">
                    {genre.name}
                  </p>
                  <p className="text-text-muted mt-0.5 text-xs font-medium">
                    {genre.count} {genre.count === 1 ? 'title' : 'titles'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopGenresStat;
