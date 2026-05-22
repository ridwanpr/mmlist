import type React from "react";

import Breadcrumb from "./Partials/Breadcrumb";
import MainInfo from "./Partials/MainInfo";
import { SideInfo } from "./Partials/SideInfo";
import TriggerWarning from "./Partials/TriggerWarning";
import FrontLayout from "../../Layouts/FrontLayout";
import AppHead from "../../Components/AppHead";

interface ShowAnimeProps {
  anime: App.DTOs.AnimeData;
  triggers: App.DTOs.TriggerData[];
  userTriggerVote: App.DTOs.AnimeTriggerData[] | null;
  userWatchlist: App.DTOs.WatchlistData | null;
  aiTriggerContext: App.DTOs.AnimeTriggerContextData[] | null;
  topComments: App.DTOs.CommentData[] | null;
}

const ShowAnime = ({
  anime,
  triggers,
  userTriggerVote,
  userWatchlist,
  aiTriggerContext,
  topComments,
}: ShowAnimeProps) => {
  const animeTitle = anime?.title_english ?? anime?.title ?? "Anime Details";
  const metaDescription = `Find ${animeTitle} trigger warnings and community safety flags on Mamorulist before you watch.`;

  return (
    <>
      <AppHead title={animeTitle} meta={metaDescription} />
      <div className="mx-auto mb-8 max-w-7xl p-4 lg:pt-6 lg:pb-6">
        {/* Breadcrumb */}
        <Breadcrumb title={animeTitle} />

        {/* Anime Information */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left Main Info */}
          <MainInfo
            anime={anime}
            userWatchlist={userWatchlist}
            topComments={topComments}
          />

          {/* Right Info */}
          <SideInfo triggers={triggers} anime={anime} />
        </div>

        <TriggerWarning
          triggers={triggers}
          anime={anime}
          userTriggerVote={userTriggerVote}
          aiTriggerContext={aiTriggerContext}
        />
      </div>
    </>
  );
};

ShowAnime.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
