import type React from "react";

import Breadcrumb from "../../Components/Anime/Breadcrumb";
import MainInfo from "../../Components/Anime/MainInfo";
import { SideInfo } from "../../Components/Anime/SideInfo";
import TriggerWarning from "../../Components/Anime/TriggerWarning";
import FrontLayout from "../../Layouts/FrontLayout";

interface ShowAnimeProps {
  anime: App.DTOs.AnimeData;
  triggers: App.DTOs.TriggerData[];
}

const ShowAnime = ({ anime, triggers }: ShowAnimeProps) => {
  return (
    <div className="mx-auto mb-8 max-w-7xl p-4 lg:pt-6 lg:pb-6">
      {/* Breadcrumb */}
      <Breadcrumb title={anime && anime.title} />

      {/* Anime Information */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left Main Info */}
        <MainInfo anime={anime && anime} />

        {/* Right Info */}
        <SideInfo />
      </div>
      <TriggerWarning triggers={triggers} anime={anime} />
    </div>
  );
};

ShowAnime.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
