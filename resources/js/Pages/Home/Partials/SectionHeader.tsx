import { Link } from "@inertiajs/react";
import type React from "react";
import { LuChevronRight } from "react-icons/lu";

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const SectionHeader = ({ title, icon, href }: SectionHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="text-primary flex items-center justify-center">
          {icon}
        </span>
        <h2 className="text-text font-serif text-lg font-bold tracking-tight">
          {title}
        </h2>
      </div>

      <Link
        href={href}
        prefetch
        className="group text-text-muted hover:text-primary flex items-center gap-0.5 font-sans text-xs font-bold tracking-wider uppercase transition-colors"
      >
        View More
        <LuChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
};

export default SectionHeader;
