import MainContent from "../../Components/UserDash/MainContent";
import SideMenu from "../../Components/UserDash/SideMenu";
import FrontLayout from "../../Layouts/FrontLayout";

const UserDash = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1">
      {/* Side Menu */}
      <SideMenu />
      {/* Main Content */}
      <MainContent />
    </div>
  );
};

UserDash.layout = (page) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
