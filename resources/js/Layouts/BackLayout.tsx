import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { toast, Toaster } from "sonner";

import AdminSidebar from "../Components/UI/AdminSidebar";

interface BackLayoutProps {
  children: React.ReactNode;
}

const BackLayout = ({ children }: BackLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const { flash } = usePage();

  useEffect(() => {
    if (flash.success) toast.success(flash.success);
    if (flash.error) toast.error(flash.error);
    if (flash.warning) toast.warning(flash.warning);
    if (flash.info) toast.info(flash.info);
  }, [flash]);

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
      <Toaster position="top-right" richColors />
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
            <PopoverButton className="px-2 font-medium outline-none hover:cursor-pointer">
              Admin 1
            </PopoverButton>
            <PopoverPanel
              anchor="bottom start"
              className="bg-background border-border flex flex-col rounded-lg border p-2 opacity-100 shadow hover:cursor-pointer"
            >
              <Link
                href="/logout"
                method="post"
                as="button"
                className="text-sm font-semibold text-red-500 hover:cursor-pointer"
              >
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