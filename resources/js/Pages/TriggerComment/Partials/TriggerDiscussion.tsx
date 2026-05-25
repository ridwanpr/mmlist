import { Link } from "@inertiajs/react";
import { show } from "../../../actions/App/Http/Controllers/AnimeController";

type TriggerDiscussionProps = {
  anime: App.DTOs.AnimeData;
};

const TriggerDiscussion = ({ anime }: TriggerDiscussionProps) => {
  return (
    <>
      <section id="discussion" className="mt-4">
        <Link
          href={show.url(anime.slug)}
          className="text-primary text-lg font-semibold"
        >
          {anime.title_english || anime.title} - Trigger Discussion
        </Link>
      </section>
    </>
  );
};

export default TriggerDiscussion;
