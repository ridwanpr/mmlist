import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { toast, Toaster } from "sonner";

import AdminSidebar from "../Components/AdminSidebar";
import ThemeToggle from "../Components/UI/ThemeToggle";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { flash } = usePage().props as any;

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
    if (flash?.warning) toast.warning(flash.warning);
    if (flash?.info) toast.info(flash.info);
  }, [flash]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className:
            "font-sans !bg-surface !text-text border !border-border shadow-xl rounded-xl p-4 !w-fit !min-w-[240px] !max-w-md",
          classNames: {
            success: "!border-l-4 !border-l-success [&_svg]:!text-success",
            error: "!border-l-4 !border-l-accent-red [&_svg]:!text-accent-red",
            warning:
              "!border-l-4 !border-l-accent-gold [&_svg]:!text-accent-gold",
            info: "!border-l-4 !border-l-primary [&_svg]:!text-primary",
            description: "text-text-muted",
            closeButton:
              "!bg-surface !text-text-muted !border-border hover:!text-text",
          },
        }}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <AdminSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ${
          isSidebarOpen ? "lg:pl-67.5" : "lg:pl-0"
        }`}
      >
        <header className="bg-surface border-border flex shrink-0 items-center justify-between border-b p-4">
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <LuMenu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <Popover className="relative">
              <PopoverButton className="px-2 font-medium outline-none hover:cursor-pointer">
                Admin 1
              </PopoverButton>
              <PopoverPanel
                anchor="bottom start"
                className="bg-background border-border flex flex-col rounded-lg border p-2 shadow"
              >
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="text-sm font-semibold text-red-500"
                >
                  Logout
                </Link>
              </PopoverPanel>
            </Popover>

            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default BackLayout;
