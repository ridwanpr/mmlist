import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";
import Discussion from "./Partials/Discussion";
import AnimeInfo from "../../Components/AnimeInfo";
import AnimeCommentBreadcrumb from "./Partials/AnimeCommentBreadcrumb";
import Pagination from "../../Components/UI/Pagination";

type AnimeCommentProps = {
  anime: App.DTOs.AnimeData;
  paginatedComment: App.DTOs.PaginatedCommentData;
  sortBy: "latest" | "most-loved" | "oldest";
};

const AnimeComment = ({
  anime,
  paginatedComment,
  sortBy,
}: AnimeCommentProps) => {
  return (
    <div>
      <div className="mx-auto mb-8 max-w-7xl px-4 py-6">
        <AnimeCommentBreadcrumb anime={anime} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
          <AnimeInfo anime={anime} />
          <Discussion
            anime={anime}
            paginatedComment={paginatedComment}
            sortBy={sortBy}
          />
        </div>
        <Pagination links={paginatedComment.links} />
      </div>
    </div>
  );
};

AnimeComment.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default AnimeComment;
