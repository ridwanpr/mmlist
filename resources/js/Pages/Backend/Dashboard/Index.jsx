import BackLayout from "../../../Layouts/BackLayout";
import AdminSidebar from "../../../Components/UI/AdminSidebar";
import { LuChevronLeft, LuMenu } from "react-icons/lu";

const Dashboard = () => {
  return (
    <div className="grid min-h-screen grid-cols-[270px_1fr]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="h-full flex flex-col">
        <div className="bg-background border-border border-b p-4">
          <div className="hover:cursor-pointer">
            <LuMenu size={24} />
          </div>
        </div>
        <main className="bg-surface p-4 flex-1">
          <h1>Overview</h1>
        </main>
      </div>
    </div>
  );
};

Dashboard.layout = (page) => <BackLayout>{page}</BackLayout>;

export default Dashboard;
