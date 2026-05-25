import { Link } from "@inertiajs/react";
import { LuChevronRight } from "react-icons/lu";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";
import { getTriggerComment } from "../../../actions/App/Http/Controllers/TriggerCommentController";

const TriggerCommentbread = ({
  anime,
  triggerContent,
}: {
  anime: App.DTOs.AnimeData;
  triggerContent: App.DTOs.TriggerContentData;
}) => {
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
      <Link
        href={getTriggerComment({
          animeslug: anime.slug,
          triggerContentSlug: triggerContent.slug,
        })}
        className="hover:text-primary text-text cursor-pointer text-xs transition-colors md:text-sm"
      >
        {triggerContent.name} - Discussion
      </Link>
    </div>
  );
};

export default TriggerCommentbread;
