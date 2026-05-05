import FrontLayout from "../../Layouts/FrontLayout";

const UserDash = () => {
  return (
    <>
      <h1>User Dashboard</h1>
    </>
  );
};

UserDash.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
