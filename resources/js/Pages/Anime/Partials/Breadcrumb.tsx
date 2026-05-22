import { Link } from "@inertiajs/react";
import { LuChevronRight } from "react-icons/lu";

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <div className="text-text-muted mb-4 hidden items-center gap-2 text-sm font-semibold md:flex">
      <Link
        href="/"
        className="hover:text-primary cursor-pointer text-xs transition-colors md:text-sm"
      >
        Home
      </Link>
      <LuChevronRight size={16} />
      <Link
        href="/browse"
        className="hover:text-primary cursor-pointer text-xs transition-colors md:text-sm"
      >
        Anime
      </Link>
      <LuChevronRight size={16} />
      <span className="text-text text-xs md:text-sm">{title}</span>
    </div>
  );
};

export default Breadcrumb;
