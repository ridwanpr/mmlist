import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "./Partials/DashContainer";
import AppHead from "../../Components/AppHead";
import CountStat from "./Stats/CountStat";
import WatchlisStatChart from "./Stats/WatchlistStatChart";
import TriggerProfileChart from "./Stats/TriggelProfileChart";

type UserDashProps = {
  watchlistStat: App.DTOs.WatchlistStatData;
  triggerFramingStat: App.DTOs.TriggerFramingStatData;
  countStat: App.DTOs.CountStatData;
};

const UserDash = ({
  watchlistStat,
  triggerFramingStat,
  countStat,
}: UserDashProps) => {
  return (
    <>
      <AppHead title="Overview" />
      <DashContainer>
        <div className="flex flex-col py-2 lg:px-8">
          <CountStat countStat={countStat} />
          <div className="grid grid-cols-1 gap-3 px-3 lg:mt-5 lg:grid-cols-2 lg:gap-5 lg:p-0">
            <WatchlisStatChart watchlistStat={watchlistStat} />
            <TriggerProfileChart triggerFramingStat={triggerFramingStat} />
          </div>
        </div>
      </DashContainer>
    </>
  );
};

UserDash.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default UserDash;
