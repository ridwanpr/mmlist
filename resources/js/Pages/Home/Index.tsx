import React from 'react';

import AnimeList from './Partials/AnimeList';
import Hero from './Partials/Hero';
import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';
import RecentVotes from './Partials/RecentVotes';
import RecentComment from './Partials/RecentComment';

interface HomeProps {
  nowAiring: App.DTOs.AnimeData[];
  topAnime: App.DTOs.AnimeData[];
  staffPick: App.DTOs.AnimeData[];
  latestComments: App.DTOs.CommentData[];
  latestVotes: App.DTOs.AnimeTriggerData[];
}

const Home = ({ nowAiring, topAnime, staffPick, latestComments, latestVotes }: HomeProps) => {
  return (
    <>
      <AppHead
        title="Track Anime Watchlist & Check Content Guide"
        meta="Welcome to Mamorulist, the community-driven anime content guide database. Search anime, check content guides, and manage your watchlist."
      />
      <Hero staffPick={staffPick} />
      <AnimeList nowAiring={nowAiring} topAnime={topAnime} />
      <RecentComment latestComments={latestComments} />
      <RecentVotes latestVotes={latestVotes} />
    </>
  );
};

Home.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default Home;
