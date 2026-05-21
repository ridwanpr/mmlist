import type React from "react";
import SideMenu from "./SideMenu";
import DashMobileNav from "./DashMobileNav";

type DashContainer = {
  children: React.ReactNode;
};

const DashContainer = ({ children }: DashContainer) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row md:gap-6 md:px-4 md:py-6">
      <SideMenu />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashMobileNav />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashContainer;
