import BackLayout from "../../../Layouts/BackLayout";

const Dashboard = () => {
  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};

Dashboard.layout = (page) => <BackLayout>{page}</BackLayout>;

export default Dashboard;
