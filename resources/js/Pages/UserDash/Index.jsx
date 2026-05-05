import FrontLayout from "../../Layouts/FrontLayout";

const UserDash = () => {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1>User Dashboard</h1>
    </div>
  );
};

UserDash.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
