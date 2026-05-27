import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "./Partials/DashContainer";
import AppHead from "../../Components/AppHead";

const UserDash = () => {
  return (
    <>
      <AppHead
        title="Overview"
      />
      <DashContainer>
        <h1>Dashboard</h1>
      </DashContainer>
    </>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
