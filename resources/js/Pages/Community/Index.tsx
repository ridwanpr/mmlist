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

      <section className="bg-surface border-border border-b font-sans">
        <div className="mx-auto mb-2 max-w-7xl p-4">
          <h1 className="text-text font-serif text-2xl font-bold">Community</h1>
        </div>
      </section>

      <section id="latest-activity" className="grid grid-cols-1 lg:grid-cols-2">
        <div id="latest-comment"></div>
        <div id="latest-vote"></div>
      </section>
    </>
  );
};

DiscussionList.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default DiscussionList;
