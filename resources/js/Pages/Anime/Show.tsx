import type React from "react";
import { LuInfo } from "react-icons/lu";

import Breadcrumb from "../../Components/Anime/Breadcrumb";
import MainInfo from "../../Components/Anime/MainInfo";
import FrontLayout from "../../Layouts/FrontLayout";

interface ShowAnimeProps {
  result: App.DTOs.AnimeData;
  triggers: App.DTOs.TriggerData;
}

const ShowAnime = ({ result, triggers }: ShowAnimeProps) => {
  console.log(triggers);
  const triggerData = [
    { name: "Violence & Gore", level: 5, label: "Very Severe" },
    { name: "Sexual Violence", level: 5, label: "Severe" },
    { name: "Suicide & Self-Harm", level: 4, label: "Moderate" },
    { name: "Body Horror", level: 4, label: "Mild" },
    { name: "Bullying & Abuse", level: 3, label: "None" },
  ];

  const getColorTheme = (level: number) => {
    switch (level) {
      case 1:
        return { bg: "bg-emerald-500", text: "text-emerald-500" };
      case 2:
        return { bg: "bg-yellow-500", text: "text-yellow-500" };
      case 3:
        return { bg: "bg-amber-500", text: "text-amber-500" };
      case 4:
        return { bg: "bg-orange-500", text: "text-orange-500" };
      case 5:
        return { bg: "bg-red-600", text: "text-red-600" };
      default:
        return { bg: "bg-text-muted", text: "text-text-muted" };
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 lg:pt-6 lg:pb-6">
      {/* Breadcrumb */}
      <Breadcrumb title={result && result.title} />

      {/* Anime Information */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left Main Info */}
        <MainInfo anime={result && result} />

        {/* Right Info */}
        <div className="min-w-0 lg:col-span-1">
          {/* Community Rating */}
          <div className="border-border bg-surface mb-4 rounded-lg border p-4">
            <p className="mb-2 font-semibold">Community Rating</p>
            <div className="mb-1 flex items-center gap-2">
              <p className="mb-2 text-2xl font-semibold text-red-500 md:text-3xl">
                Severe
              </p>
            </div>
            <p className="mb-2 text-sm">based on 2,842 votes</p>
            <p className="text-text/90 text-sm font-bold">What is this?</p>
            <p className="text-text/90 mb-2 text-sm">
              Our community reviews how frequent or intense a trigger appears.
              See trigger list for individual ratings.
            </p>
          </div>

          {/* At a Glance */}
          <div className="border-border bg-surface mb-4 rounded-lg border p-4">
            <div className="mb-4">
              <p className="text-text font-semibold">At a Glance</p>
            </div>

            <div className="flex flex-col gap-3">
              {triggerData.map((trigger, idx) => {
                const theme = getColorTheme(trigger.level);
                return (
                  <div
                    key={idx}
                    className="border-border/50 flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-text/90 text-sm font-medium">
                      {trigger.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${theme.bg}`}
                      ></span>
                      <span
                        className={`text-[11px] font-bold tracking-wider uppercase ${theme.text}`}
                      >
                        {trigger.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Advisory */}
          <div className="border-border bg-surface mb-4 rounded-lg border p-4">
            <div className="mb-4">
              <p className="text-text font-semibold">Content Advisory</p>
            </div>
            <p className="text-text/90 text-sm text-pretty">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo ratione eveniet excepturi sint, sit, inventore
              necessitatibus tempore dolorum delectus aliquam earum dolor nam
              culpa tenetur laborum! Porro non eius nisi!
            </p>
            <p className="text-text-muted mt-1 flex items-center gap-1 text-xs">
              <LuInfo /> AI Generated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ShowAnime.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
