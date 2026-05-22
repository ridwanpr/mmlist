import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import DashContainer from "../UserDash/Partials/DashContainer";

type VotesProps = {
  votes: App.DTOs.PaginatedAnimeTriggerData;
};

const Votes = ({ votes }: VotesProps) => {
  console.log(votes);
  return (
    <DashContainer>
      <div className="p-4 lg:p-0">
        <div className="mb-4">
          <h1 className="text-text font-serif text-xl font-semibold tracking-wide md:text-2xl">
            Votes
          </h1>
        </div>
        <div></div>
      </div>
    </DashContainer>
  );
};

Votes.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Votes;
