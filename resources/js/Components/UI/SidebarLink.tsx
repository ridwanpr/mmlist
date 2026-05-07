import { Link, usePage } from "@inertiajs/react";
import type React from "react";

interface SidebarLinkProps {
  href: string,
  routeName: string,
  children: React.ReactNode
}

const SidebarLink = ({ href, routeName, children }: SidebarLinkProps) => {
  const { props } = usePage();
  const currentRoute = props.currentRoute;

  const isActive = currentRoute === routeName;

  return (
    <Link
      href={href}
      className={`text-text hover:bg-primary-soft mb-1 flex items-center gap-3 rounded px-3 py-3 text-sm transition-colors duration-200 ${
        isActive ? "bg-primary-soft" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
