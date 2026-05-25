import AnimeInfo from "../../Components/AnimeInfo";
import FrontLayout from "../../Layouts/FrontLayout";
import TriggerCommentbread from "./Partials/TriggerCommentBread";
import TriggerDiscussion from "./Partials/TriggerDiscussion";
import TriggerStat from "./Partials/TriggerStat";

type TriggerCommentProps = {
  anime: App.DTOs.AnimeData;
  triggerContent: App.DTOs.TriggerContentData;
  triggerStatData: App.DTOs.AnimeTriggerStatData;
};

const TriggerComment = ({
  anime,
  triggerContent,
  triggerStatData,
}: TriggerCommentProps) => {
  return (
    <div>
      <div className="mx-auto mb-8 max-w-7xl px-4 py-6">
        <TriggerCommentbread triggerContent={triggerContent} anime={anime} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
          <AnimeInfo anime={anime} />
          <div>
            <TriggerStat data={triggerStatData} />
            <TriggerDiscussion anime={anime} />
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
