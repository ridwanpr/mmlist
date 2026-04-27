import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LuArrowDownUp, LuChevronDown, LuFilter } from "react-icons/lu";
import DropdownMenu from "../UI/DropdownMenu";

const SearchSection = () => {
  const genreOptions = [
    { label: "Action", onClick: () => console.log("Action clicked") },
    { label: "Adventure", onClick: () => console.log("Adventure clicked") },
    { label: "Comedy", onClick: () => console.log("Comedy clicked") },
  ];

  const yearOptions = [
    { label: "2024", onClick: () => console.log("2024 clicked") },
    { label: "2023", onClick: () => console.log("2023 clicked") },
  ];

  return (
    <div className="p-4 lg:py-8">
      <div className="bg-surface">
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
          <button className="bg-surface-alt border-border flex flex-1 items-center justify-center gap-1 rounded-lg border p-3 lg:hidden">
            <LuFilter /> Filter
          </button>
          <button className="bg-surface border-border flex flex-1 items-center justify-center gap-1 rounded-lg border p-3 lg:hidden">
            <LuArrowDownUp /> Sort
          </button>

          <div className="hidden lg:flex lg:gap-3">
            <DropdownMenu title="Genre" items={genreOptions} />
            <DropdownMenu title="Year" items={yearOptions} />

            <button className="bg-surface border-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2">
              Studio <LuChevronDown className="text-muted-foreground h-4 w-4" />
            </button>
            <button className="bg-surface border-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2">
              Rating <LuChevronDown className="text-muted-foreground h-4 w-4" />
            </button>
          </div>

          <div className="ml-auto hidden lg:flex lg:items-center lg:gap-2">
            <span className="text-sm font-medium">Sort by</span>
            <button className="bg-surface border-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2">
              <LuArrowDownUp className="h-4 w-4" /> Default{" "}
              <LuChevronDown className="text-muted-foreground h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
