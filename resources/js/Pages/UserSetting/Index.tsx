import type React from "react";
import DashContainer from "../UserDash/Partials/DashContainer";
import FrontLayout from "../../Layouts/FrontLayout";

const UserSetting = () => {
  return (
    <DashContainer>
      <div>
        <h1>Setting</h1>
      </div>
    </DashContainer>
  );
};

UserSetting.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default UserSetting;
