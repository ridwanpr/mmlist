import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "./Partials/DashContainer";

const UserDash = () => {
  return (
    <DashContainer>
      <h1>Dashboard</h1>
    </DashContainer>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
