import { Link } from "@inertiajs/react";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";

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
          {anime.title_english || anime.title} - Trigger Discussion
        </Link>
        <p className="text-text/80 text-sm">{triggerContent.description}</p>
      </section>
    </>
  );
};

export default TriggerDiscussionTitle;
