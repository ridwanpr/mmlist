import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "./Partials/DashContainer";
import AppHead from "../../Components/AppHead";
import {
  LuPercent,
  LuPlay,
  LuPopcorn,
  LuStar,
  LuTrash,
  LuTv,
} from "react-icons/lu";

const UserDash = () => {
  return (
    <>
      <AppHead title="Overview" />
      <DashContainer>
        <div className="py-2 lg:px-8">
          {/* Base grid set to 2 columns for mobile 2x3 layout */}
          <div className="mb-6 grid grid-cols-2 gap-3 p-3 lg:grid-cols-3 lg:gap-5 lg:p-0">
            {/* Total Anime */}
            <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
              <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
                <LuTv className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
                  900
                </p>
                <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
                  Total Anime
                </p>
              </div>
            </div>

            {/* Episode Watched */}
            <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
              <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
                <LuPlay className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
                  1,222
                </p>
                <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
                  Episodes Watched
                </p>
              </div>
            </div>

            {/* Currently Watching */}
            <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
              <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
                <LuPopcorn className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
                  9
                </p>
                <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
                  Currently Watching
                </p>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
              <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
                <LuPercent className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
                  92%
                </p>
                <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
                  Completion Rate
                </p>
              </div>
            </div>

            {/* Drop Rate */}
            <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
              <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
                <LuTrash className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
                  4%
                </p>
                <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
                  Drop Rate
                </p>
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-surface border-border hover:border-text-muted/30 flex items-center gap-2.5 rounded-lg border p-3 transition-all">
              <div className="bg-surface-alt text-text shrink-0 rounded-lg p-2">
                <LuStar className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-text text-lg leading-tight font-extrabold tracking-tight sm:text-xl">
                  8.5
                </p>
                <p className="text-text-muted mt-0.5 truncate text-[11px] font-medium sm:text-xs">
                  Average Score
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashContainer>
    </>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
