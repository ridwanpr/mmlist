import { LuChevronLeft, LuMenu } from "react-icons/lu";
import AdminSidebar from "../Components/UI/AdminSidebar";
import { useState } from "react";

const BackLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />
      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="bg-background border-border border-b p-4">
          <div className="hover:cursor-pointer" onClick={toggleSidebar}>
            <LuMenu size={24} />
          </div>
        </div>
        <main className="bg-surface flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default BackLayout;
