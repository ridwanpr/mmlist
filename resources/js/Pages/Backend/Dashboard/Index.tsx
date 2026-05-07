import type React from "react";

import BackLayout from "../../../Layouts/BackLayout";

const Dashboard = () => {
  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};

Dashboard.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default Dashboard;
