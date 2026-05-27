import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "./Partials/DashContainer";
import AppHead from "../../Components/AppHead";
import CountStat from "./Stats/CountStat";

const UserDash = () => {
  return (
    <>
      <AppHead title="Overview" />
      <DashContainer>
        <div className="py-2 lg:px-8">
          <CountStat />
        </div>
      </DashContainer>
    </>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
