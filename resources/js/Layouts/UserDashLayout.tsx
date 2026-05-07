import type React from "react";

interface UserDashLayoutProps {
  children: React.ReactNode
}

const UserDashLayout = ({ children }: UserDashLayoutProps) => {
  return <div>
    <h1>UserDashLayout</h1>
    <div>{children}</div>
  </div>;
};

export default UserDashLayout;
