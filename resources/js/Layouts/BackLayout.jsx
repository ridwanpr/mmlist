import { LuChevronLeft, LuMenu } from "react-icons/lu";
import AdminSidebar from "../Components/UI/AdminSidebar";
import { useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link } from "@inertiajs/react";

const BackLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />
      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="bg-background border-border flex items-center justify-between border-b p-4">
          <div className="hover:cursor-pointer" onClick={toggleSidebar}>
            <LuMenu size={24} />
          </div>
          <Popover className="relative">
            <PopoverButton className="px-2 font-medium outline-none">
              Admin 1
            </PopoverButton>
            <PopoverPanel
              anchor="bottom start"
              className="bg-background border-border flex flex-col rounded-lg border p-2 opacity-100 shadow"
            >
              <Link href="/" className="text-sm font-semibold text-red-500">
                Logout
              </Link>
            </PopoverPanel>
          </Popover>
        </div>
        <main className="bg-surface flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default BackLayout;
