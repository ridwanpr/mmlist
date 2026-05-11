import type React from "react";

import Breadcrumb from "../../Components/Anime/Breadcrumb";
import MainInfo from "../../Components/Anime/MainInfo";
import { SideInfo } from "../../Components/Anime/SideInfo";
import TriggerWarning from "../../Components/Anime/TriggerWarning";
import FrontLayout from "../../Layouts/FrontLayout";

interface ShowAnimeProps {
  result: App.DTOs.AnimeData;
  triggers: App.DTOs.TriggerData[];
}

const ShowAnime = ({ result, triggers }: ShowAnimeProps) => {
  return (
    <div className="mx-auto max-w-7xl p-4 lg:pt-6 lg:pb-6">
      {/* Breadcrumb */}
      <Breadcrumb title={result && result.title} />

      {/* Anime Information */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left Main Info */}
        <MainInfo anime={result && result} />

        {/* Right Info */}
        <SideInfo />
      </div>
      <TriggerWarning triggers={triggers} />
    </div>
  );
};

ShowAnime.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
