import { Link } from "@inertiajs/react";
import { LuChevronRight } from "react-icons/lu";

const SectionHeader = ({ title, icon }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="mb-2 flex items-center gap-2 font-bold">
        {icon} {title}
      </h2>
      <Link className="flex items-center">
        View All <LuChevronRight />
      </Link>
    </div>
  );
};

export default SectionHeader;
