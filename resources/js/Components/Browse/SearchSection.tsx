import DropdownMenu from "../UI/DropdownMenu";
import { LuFlame, LuTv, LuCalendar, LuShuffle } from "react-icons/lu";

interface SearchSectionProps {
  genres: App.DTOs.GenreData[];
  themes: App.DTOs.ThemeData[];
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

  const handleQuickAction = (actionId: string) => {
    console.log(`Quick action triggered: ${actionId}`);
  };

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-7xl p-4 lg:pt-8 lg:pb-6">
        <h1 className="text-text mb-2 font-serif text-2xl font-bold">
          Browse Anime
        </h1>
        <p className="text-text-muted mb-4">
          Find anime and view trigger warnings to make informed choices.
        </p>

        {/* Search Bar */}
        <div className="relative mb-3">
          <input
            type="text"
            className="border-border focus:ring-primary/50 w-full rounded-lg border-2 p-3 focus:ring-2 focus:outline-none"
            placeholder="Search anime..."
          />
        </div>

        {/* Quick Actions (Pills) */}
        <div className="mb-6 flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="border-border text-text-muted hover:border-primary hover:text-text flex items-center gap-2 rounded-full border bg-transparent px-4 py-1.5 text-sm font-medium transition-all active:scale-95"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Filters and Button Container */}
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          {/* Dropdowns Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-4">
            <DropdownMenu title="Genre" items={genreOptions} />
            <DropdownMenu title="Theme" items={themeOptions} />
            <DropdownMenu title="Year" items={yearOptions} />
            <DropdownMenu title="Season" items={seasonOptions} />
            <DropdownMenu title="Type" items={typeOptions} />
          </div>

          {/* Main Action Button */}
          <button className="bg-primary text-surface w-full rounded-lg px-6 py-3 font-semibold whitespace-nowrap transition-all hover:brightness-110 active:scale-[0.98] lg:w-auto lg:py-2">
            Apply Filter & Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
