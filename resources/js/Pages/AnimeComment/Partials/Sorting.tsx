type SortingProps = {
  sortBy: "latest" | "most-loved" | "oldest";
  handleFilter: (filter: string) => void;
};

const Sorting = ({ sortBy, handleFilter }: SortingProps) => {
  return (
    <div className="mt-4 mb-4 flex items-center gap-1 text-xs font-semibold">
      <button
        onClick={() => handleFilter("most-loved")}
        className={`${sortBy === "most-loved" ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
      >
        Most Loved
      </button>
      <button
        onClick={() => handleFilter("latest")}
        className={`${sortBy === "latest" ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
      >
        Latest
      </button>
      <button
        onClick={() => handleFilter("oldest")}
        className={`${sortBy === "oldest" ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"} rounded-md px-3 py-1.5 transition hover:cursor-pointer active:scale-95`}
      >
        Oldest
      </button>
    </div>
  );
};

export default Sorting;
