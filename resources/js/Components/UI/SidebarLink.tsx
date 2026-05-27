import { Link, usePage } from "@inertiajs/react";
import type React from "react";

interface SidebarLinkProps {
  href: string;
  routeName: string;
  children: React.ReactNode;
  method?: "get" | "post" | "put" | "patch" | "delete";
}

const SidebarLink = ({
  href,
  routeName,
  children,
  method,
}: SidebarLinkProps) => {
  const { props } = usePage();
  const currentRoute = props.currentRoute;

  const isActive = currentRoute === routeName;

  return (
    <Link
      href={href}
      method={method != null ? method : "get"}
      prefetch={href === "/logout" ? false : "click"}
      className={`text-text hover:bg-primary-soft mb-1 flex items-center gap-3 rounded px-3 py-3 text-sm transition-colors duration-200 hover:cursor-pointer ${
        isActive ? "bg-primary-soft" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
