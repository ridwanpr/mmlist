import { Link } from "@inertiajs/react";
import { LuChevronRight } from "react-icons/lu";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";

const AnimeCommentBreadcrumb = ({ anime }: { anime: App.DTOs.AnimeData }) => {
  return (
    <div className="text-text-muted mb-6 hidden items-center gap-2 text-sm font-semibold md:flex">
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
      <Link
        href={show.url(anime.slug)}
        className="hover:text-primary cursor-pointer text-xs transition-colors md:text-sm"
      >
        {anime.title}
      </Link>
      <LuChevronRight size={16} />
      <span className="text-text text-xs md:text-sm">Discussion</span>
    </div>
  );
};

export default AnimeCommentBreadcrumb;
