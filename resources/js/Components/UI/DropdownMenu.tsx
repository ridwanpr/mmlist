// DropdownMenu.tsx
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

interface DropdownItem {
  label: string;
  onClick: () => void;
  selected?: boolean;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
}

const DropdownMenu = ({ title, items }: DropdownMenuProps) => {
  const selectedCount = items.filter((item) => item.selected).length;

  return (
    <Menu>
      <MenuButton className="bg-surface border-border hover:bg-surface-alt flex items-center justify-between gap-2 rounded-lg border px-4 py-2 transition-colors hover:cursor-pointer focus:ring-2 focus:ring-blue-500/50 focus:outline-none">
        <span className="flex items-center gap-2">
          {title}
          {selectedCount > 0 ? (
            <span className="bg-primary-soft text-primary rounded-full px-2 py-0.5 text-xs">
              {selectedCount}
            </span>
          ) : null}
        </span>

        <LuChevronDown className="text-muted-foreground h-4 w-4" />
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: "bottom start", gap: 8 }}
        className="bg-surface border-border z-50 w-56 origin-top-left rounded-xl border p-1.5 shadow-lg transition duration-150 ease-out hover:cursor-pointer focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="max-h-72 overflow-y-auto">
          {items.map((item, index) => (
            <MenuItem key={`${item.label}-${index}`}>
              <button
                type="button"
                onClick={item.onClick}
                className="text-foreground data-focus:bg-surface-alt flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:cursor-pointer"
              >
                <span>{item.label}</span>
                {item.selected ? <LuCheck className="h-4 w-4" /> : null}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
