import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashMobileNav from "../../Components/UserDash/DashMobileNav";
import MainContent from "../../Components/UserDash/MainContent";
import SideMenu from "../../Components/UserDash/SideMenu";

const UserDash = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row md:gap-6 md:px-4 md:py-6">
      <SideMenu />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashMobileNav />
        <MainContent />
      </div>
    </div>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
