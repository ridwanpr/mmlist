import type React from "react";

import BackLayout from "../../../Layouts/BackLayout";

const ManageAnime = () => {
  return (
    <div>
      <h1>Manage Anime</h1>
    </div>
  );
};

ManageAnime.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default ManageAnime;
