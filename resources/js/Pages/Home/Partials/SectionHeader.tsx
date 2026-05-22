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
    <div className="flex items-center justify-between">
      <h2 className="text-primary mb-2 flex items-center gap-2 font-serif font-bold">
        {icon} {title}
      </h2>
      <Link href={href} className="flex items-center text-sm">
        View All <LuChevronRight />
      </Link>
    </div>
  );
};

export default SectionHeader;
