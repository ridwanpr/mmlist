import DropdownMenu from "../UI/DropdownMenu";

interface SearchSectionProps {
  genres: App.DTOs.GenreData[];
  themes: App.DTOs.ThemeData[];
  year: number[];
  type: string[];
  season: string[];
}

const SearchSection = ({
  genres,
  themes,
  year,
  type,
  season,
}: SearchSectionProps) => {
  const genreOptions = genres.map((genre) => ({
    label: genre.name,
    onClick: () => console.log("clicked"),
  }));

  const themeOptions = themes.map((theme) => ({
    label: theme.name,
    onClick: () => console.log("clicked"),
  }));

  const yearOptions = year.map((item) => ({
    label: item.toString(),
    onClick: () => console.log("clicked"),
  }));

  const seasonOptions = season.map((item) => ({
    label: item.toUpperCase(),
    onClick: () => console.log("clicked"),
  }));

  const typeOptions = type.map((item) => ({
    label: item.toString(),
    onClick: () => console.log("clicked"),
  }));

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-7xl p-4 lg:pt-8 lg:pb-6">
        <h1 className="text-text mb-2 font-serif text-2xl font-bold">
          Browse Anime
        </h1>
        <p className="text-text-muted mb-4">
          Find anime and view trigger warnings to make informed choices.
        </p>

        <input
          type="text"
          className="border-border focus:ring-primary/50 mb-4 w-full rounded-lg border-2 p-3 focus:ring-2 focus:outline-none"
          placeholder="Search anime..."
        />

        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-4">
            <DropdownMenu title="Genre" items={genreOptions} />
            <DropdownMenu title="Theme" items={themeOptions} />
            <DropdownMenu title="Year" items={yearOptions} />
            <DropdownMenu title="Season" items={seasonOptions} />
            <DropdownMenu title="Type" items={typeOptions} />
          </div>

          <button className="bg-primary text-surface w-full rounded-lg px-4 py-3 font-medium whitespace-nowrap transition-opacity hover:opacity-90 lg:w-auto lg:py-2">
            Apply Filter & Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
