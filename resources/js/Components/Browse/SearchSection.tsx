import { useState } from "react";
import { LuFilter } from "react-icons/lu";

import DropdownMenu from "../UI/DropdownMenu";
import ModalDialog from "../UI/ModalDialog";

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
  const [isOpen, setIsOpen] = useState(false);

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
          className="border-border mb-4 w-full rounded-lg border-2 p-3"
          placeholder="Search anime..."
        />

        <div className="flex w-full items-center gap-4">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-surface-alt border-border flex flex-1 items-center justify-center gap-1 rounded-lg border p-3 lg:hidden"
          >
            <LuFilter /> Filter
          </button>

          {/* Mobile Filter Dialog Component */}
          <ModalDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Filter Anime"
          >
            <div className="space-y-6">
              {/* Mobile Genre Filter Section */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-500">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres &&
                    genres.map((genre) => (
                      <button
                        key={genre.id}
                        className="border-border hover:bg-surface-alt rounded-full border px-4 py-1.5 text-sm transition-colors focus:border-blue-500 focus:bg-blue-100"
                      >
                        {genre.name}
                      </button>
                    ))}
                </div>
              </div>

              {/* Mobile Year Filter Section */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-500">
                  Year
                </h3>
                <div className="flex flex-wrap gap-2">
                  {yearOptions.map((year) => (
                    <button
                      key={year.label}
                      onClick={year.onClick}
                      className="border-border hover:bg-surface-alt rounded-full border px-4 py-1.5 text-sm transition-colors focus:border-blue-500 focus:bg-blue-100"
                    >
                      {year.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ModalDialog>

          {/* Desktop Filters */}
          <div className="hidden w-full justify-start lg:flex lg:justify-between lg:gap-3">
            <div className="flex gap-4">
              <DropdownMenu title="Genre" items={genreOptions} />
              <DropdownMenu title="Theme" items={themeOptions} />
              <DropdownMenu title="Year" items={yearOptions} />
              <DropdownMenu title="Season" items={seasonOptions} />
              <DropdownMenu title="Type" items={typeOptions} />
            </div>
            <button className="bg-primary text-surface rounded-lg px-3 py-1">
              Apply Filter & Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
