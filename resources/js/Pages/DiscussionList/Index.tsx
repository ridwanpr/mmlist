import React from 'react';

import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';

const DiscussionList = () => {
  return (
    <>
      <AppHead
        title="Discussion - Mamorulist"
        meta="Join latest anime and trigger content warnings discussion on mamorulist"
      />


    </>
  );
};

DiscussionList.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default DiscussionList;
