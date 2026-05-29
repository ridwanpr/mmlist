type SortWatchlistProps = {
  sortBy: 'latest' | 'score' | 'oldest';
  handleFilter: (filter: 'latest' | 'score' | 'oldest') => void;
};

const SortWatchlist = ({ sortBy, handleFilter }: SortWatchlistProps) => {
  return (
    <div className="flex items-center justify-end gap-1 text-xs font-semibold">
      <button
        onClick={() => handleFilter('latest')}
        className={`${sortBy === 'latest' ? 'bg-primary-soft text-primary' : 'text-text-muted hover:bg-surface-alt hover:text-text'} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
      >
        Latest
      </button>
      <button
        onClick={() => handleFilter('score')}
        className={`${sortBy === 'score' ? 'bg-primary-soft text-primary' : 'text-text-muted hover:bg-surface-alt hover:text-text'} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
      >
        Score
      </button>
      <button
        onClick={() => handleFilter('oldest')}
        className={`${sortBy === 'oldest' ? 'bg-primary-soft text-primary' : 'text-text-muted hover:bg-surface-alt hover:text-text'} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
      >
        Oldest
      </button>
    </div>
  );
};

export default SortWatchlist;
