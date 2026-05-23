import type React from "react";
import FrontLayout from "../../Layouts/FrontLayout";

const AnimeComment = () => {
  return (
    <>
      <div>
        <h1>Anime Comment</h1>
      </div>
    </>
  );
};

AnimeComment.layout = (page: React.ReactNode) => (
  <FrontLayout>{page}</FrontLayout>
);

export default AnimeComment;
