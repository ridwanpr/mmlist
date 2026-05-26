import { router, usePage } from "@inertiajs/react";
import AnimeInfo from "../../Components/AnimeInfo";
import FrontLayout from "../../Layouts/FrontLayout";
import TriggerCommentbread from "./Partials/TriggerCommentBread";
import TriggerDiscussionTitle from "./Partials/TriggerDiscussionTitle";
import TriggerFormComment from "./Partials/TriggerFormComment";
import Sorting from "../../Components/Sorting";
import { getTriggerComment } from "../../actions/App/Http/Controllers/TriggerCommentController";
import TriggerStat from "./Partials/TriggerStat";

type TriggerCommentProps = {
  anime: App.DTOs.AnimeData;
  triggerContent: App.DTOs.TriggerContentData;
  triggerStatData: App.DTOs.AnimeTriggerStatData;
  sortBy: "latest" | "most-loved" | "oldest";
};

const TriggerComment = ({
  anime,
  triggerContent,
  sortBy,
  triggerStatData,
}: TriggerCommentProps) => {
  const { auth } = usePage().props;
  const isGuest = !auth.user;

  const handleFilter = (filter: string) => {
    router.get(
      getTriggerComment.url({
        animeslug: anime.slug,
        triggerContentSlug: triggerContent.slug,
      }),
      { sort: filter },
      { preserveScroll: true },
    );
  };

  return (
    <div>
      <div className="mx-auto mb-8 max-w-7xl px-4 py-6">
        <TriggerCommentbread triggerContent={triggerContent} anime={anime} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
          <AnimeInfo anime={anime} />
          <div>
            <TriggerDiscussionTitle
              anime={anime}
              triggerContent={triggerContent}
            />
            <TriggerStat triggerStatData={triggerStatData} />
            <TriggerFormComment
              triggerContent={triggerContent}
              isGuest={isGuest}
            />
            <Sorting sortBy={sortBy} handleFilter={handleFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

TriggerComment.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default TriggerComment;
