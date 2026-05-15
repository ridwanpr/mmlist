import { useState } from "react";
import DropdownMenu from "../UI/DropdownMenu";
import { LuFlame, LuTv, LuCalendar, LuShuffle, LuFilter } from "react-icons/lu";

// Assuming these match your App.DTOs
interface SearchSectionProps {
  genres: { id: number; name: string }[];
  themes: { id: number; name: string }[];
  year: number[];
  type: string[];
  season: string[];
}

const QUICK_ACTIONS = [
  {
    label: "Top Anime",
    id: "top",
    icon: <LuFlame size={16} className="text-orange-500" />,
  },
  {
    label: "Currently Airing",
    id: "ongoing",
    icon: <LuTv size={16} className="text-blue-500" />,
  },
  {
    label: "Upcoming",
    id: "upcoming",
    icon: <LuCalendar size={16} className="text-green-500" />,
  },
  {
    label: "Random",
    id: "random",
    icon: <LuShuffle size={16} className="text-purple-500" />,
  },
];

const SearchSection = ({
  genres,
  themes,
  year,
  type,
  season,
}: SearchSectionProps) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // state for mobile filter toggle
  const [showFilters, setShowFilters] = useState(false);

  const toggleSelection = <T,>(
    item: T,
    state: T[],
    setState: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    setState((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  // Map data to Dropdown options
  const genreOptions = genres.map((genre) => ({
    label: genre.name,
    selected: selectedGenres.includes(genre.id),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      toggleSelection(genre.id, selectedGenres, setSelectedGenres);
    },
  }));

  const themeOptions = themes.map((theme) => ({
    label: theme.name,
    selected: selectedThemes.includes(theme.id),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      toggleSelection(theme.id, selectedThemes, setSelectedThemes);
    },
  }));

  const yearOptions = year.map((item) => ({
    label: item.toString(),
    selected: selectedYears.includes(item),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      toggleSelection(item, selectedYears, setSelectedYears);
    },
  }));

  const seasonOptions = season.map((item) => ({
    label: item.toUpperCase(),
    selected: selectedSeasons.includes(item),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      toggleSelection(item, selectedSeasons, setSelectedSeasons);
    },
  }));

  const typeOptions = type.map((item) => ({
    label: item.toString(),
    selected: selectedTypes.includes(item),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      toggleSelection(item, selectedTypes, setSelectedTypes);
    },
  }));

  const handleQuickAction = (actionId: string) => {
    console.log(`Quick action triggered: ${actionId}`);
  };

  const handleApplyFilter = () => {
    const filterData = {
      query: searchQuery,
      genres: selectedGenres,
      themes: selectedThemes,
      years: selectedYears,
      seasons: selectedSeasons,
      types: selectedTypes,
    };

    console.log("Applying Filters:", filterData);
    // auto-close filters on mobile after applying
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  const activeFiltersCount =
    selectedGenres.length +
    selectedThemes.length +
    selectedYears.length +
    selectedSeasons.length +
    selectedTypes.length;

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-7xl p-4 lg:pt-8 lg:pb-6">
        <h1 className="text-text mb-2 font-serif text-2xl font-bold">
          Browse Anime
        </h1>
        <p className="text-text-muted mb-4">
          Find anime and view trigger warnings to make informed choices.
        </p>

        {/* Search Bar & Mobile Filter Toggle */}
        <div className="relative mb-3 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border focus:ring-primary/50 w-full rounded-lg border-2 p-3 focus:ring-2 focus:outline-none"
            placeholder="Search anime..."
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex shrink-0 items-center justify-center rounded-lg border-2 px-4 transition-colors lg:hidden ${
              showFilters || activeFiltersCount > 0
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-text-muted hover:border-primary/50"
            }`}
            aria-label="Toggle filters"
          >
            <span className="relative flex items-center gap-2">
              <LuFilter size={20} />
              {activeFiltersCount > 0 && (
                <span className="bg-primary absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                  {activeFiltersCount}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Quick Action */}
        <div className="relative mb-6 sm:mx-0">
          <div
            className="from-surface pointer-events-none absolute top-0 right-0 bottom-2 z-10 w-16 bg-linear-to-l to-transparent sm:hidden"
            aria-hidden="true"
          />

          <div className="flex w-full snap-x gap-2 overflow-x-auto px-4 pb-2 whitespace-nowrap [scrollbar-width:none] sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="border-border text-text-muted hover:border-primary hover:text-text flex shrink-0 snap-start items-center gap-2 rounded-full border bg-transparent px-4 py-1.5 text-sm font-medium transition-all active:scale-95"
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Button Container - Conditionally hidden on mobile */}
        <div
          className={`${
            showFilters ? "flex" : "hidden"
          } w-full flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-6`}
        >
          {/* Dropdowns Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-4">
            <DropdownMenu title="Genre" items={genreOptions} />
            <DropdownMenu title="Theme" items={themeOptions} />
            <DropdownMenu title="Year" items={yearOptions} />
            <DropdownMenu title="Season" items={seasonOptions} />
            <DropdownMenu title="Type" items={typeOptions} />
          </div>

          {/* Main Action Button */}
          <button
            onClick={handleApplyFilter}
            className="bg-primary text-surface w-full rounded-lg px-6 py-3 font-semibold whitespace-nowrap transition-all hover:brightness-110 active:scale-[0.98] lg:w-auto lg:py-2"
          >
            Apply Filter & Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
