import { Link } from "@inertiajs/react";
import { LuChevronRight } from "react-icons/lu";

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <div className="text-text-muted mb-4 flex items-center gap-2 text-sm font-semibold">
      <Link
        href="/"
        className="hover:text-primary cursor-pointer transition-colors"
      >
        Home
      </Link>
      <LuChevronRight size={16} />
      <Link
        href="/browse"
        className="hover:text-primary cursor-pointer transition-colors"
      >
        Anime
      </Link>
      <LuChevronRight size={16} />
      <span className="text-text">{title && title}</span>
    </div>
  );
};

export default Breadcrumb;
