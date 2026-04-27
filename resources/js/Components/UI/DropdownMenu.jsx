import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LuChevronDown } from "react-icons/lu";

const DropdownMenu = ({ title, items }) => {
  return (
    <Menu>
      <MenuButton className="bg-surface border-border hover:bg-surface-alt flex items-center justify-center gap-2 rounded-lg border px-4 py-2 transition-colors focus:ring-2 focus:ring-blue-500/50 focus:outline-none">
        {title}
        <LuChevronDown className="text-muted-foreground h-4 w-4" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="bg-surface border-border z-50 mt-2 w-48 origin-top-left rounded-xl border p-1.5 shadow-lg transition duration-150 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        {items.map((item, index) => (
          <MenuItem key={index}>
            <button
              onClick={item.onClick}
              className="text-foreground data-focus:bg-surface-alt flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors"
            >
              {item.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
