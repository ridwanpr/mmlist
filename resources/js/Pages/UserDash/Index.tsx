import type React from "react";

import MainContent from "../../Components/UserDash/MainContent";
import FrontLayout from "../../Layouts/FrontLayout";
import SideMenu from "../../Components/UserDash/SideMenu";

const UserDash = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4">
      {/* Nav Menu */}
      <SideMenu />
      {/* Main Content */}
      <MainContent />
    </div>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
