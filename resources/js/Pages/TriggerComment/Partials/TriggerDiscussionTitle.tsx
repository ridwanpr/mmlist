import { Link } from "@inertiajs/react";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";
import { LuDot } from "react-icons/lu";

type TriggerDiscussionTitleProps = {
  anime: App.DTOs.AnimeData;
  triggerContent: App.DTOs.TriggerContentData;
};

const TriggerDiscussionTitle = ({
  anime,
  triggerContent,
}: TriggerDiscussionTitleProps) => {
  return (
    <>
      <section id="discussion" className="mt-4">
        <Link
          href={show.url(anime.slug)}
          className="text-primary text-lg font-semibold"
        >
          {anime.title_english || anime.title}
        </Link>
        <p className="text-text text-sm">
          {triggerContent.name} -{" "}
          <span className="text-text-muted">{triggerContent.description}</span>
        </p>
      </section>
    </>
  );
};

export default TriggerDiscussionTitle;
