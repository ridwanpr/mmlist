import type React from 'react';
import Breadcrumb from './Partials/Breadcrumb';
import MainInfo from './Partials/MainInfo';
import { SideInfo } from './Partials/SideInfo';
import TriggerWarning from './Partials/TriggerWarning';
import FrontLayout from '../../Layouts/FrontLayout';
import AppHead from '../../Components/AppHead';
import { Link } from '@inertiajs/react';
import { settingIndex } from '../../actions/App/Http/Controllers/UserDashboardController';
import { useState } from 'react';
import TriggerConsent from './Partials/TriggerConsent';
import AnimeRecs from './Partials/AnimeRecs';

interface ShowAnimeProps {
  anime: App.DTOs.AnimeData & { is_restricted?: boolean };
  triggers: App.DTOs.TriggerData[];
  userTriggerVote: App.DTOs.AnimeTriggerData[] | null;
  userWatchlist: App.DTOs.WatchlistData | null;
  aiTriggerContext: App.DTOs.AnimeTriggerContextData[] | null;
  topComments: App.DTOs.CommentData[] | null;
  countComments: number;
  user: App.DTOs.UserData | null;
  countTriggerComments: Record<number, number>;
  animeRelation: App.DTOs.AnimeRelationData[];
  animeRecs: App.DTOs.AnimeData[];
}

const ShowAnime = ({
  anime,
  triggers,
  userTriggerVote,
  userWatchlist,
  aiTriggerContext,
  topComments,
  countComments,
  user,
  countTriggerComments,
  animeRelation,
  animeRecs,
}: ShowAnimeProps) => {
  const animeTitle = anime?.title_english ?? anime?.title ?? 'Anime Details';

  const [isTriggerConsent, setIsTriggerConsent] = useState(false);

  if (anime?.is_restricted) {
    return (
      <>
        <AppHead
          title="Content Notice"
          meta="This content is filtered based on viewing preferences."
        />
        <div className="mx-auto mb-8 max-w-7xl p-4 font-sans lg:pt-6 lg:pb-6">
          <Breadcrumb title="Content Notice" />

          <div className="border-border bg-surface mx-auto mt-8 max-w-2xl border p-8 text-center md:p-12">
            <h1 className="text-text mb-4 text-xl font-bold tracking-wider uppercase">
              NSFW Content Filtered
            </h1>
            <p className="text-text-muted mb-8 text-sm leading-relaxed">
              {user ? (
                <>
                  {animeTitle} is rated Rx (Hentai). This content is hidden based on your current
                  viewing preferences. You can change your preferences in settings.
                </>
              ) : (
                <>
                  {animeTitle} is rated Rx (Hentai). This content is filtered by default for
                  anonymous visitors. You can adjust your viewing preferences by logging in or
                  creating an account.
                </>
              )}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="bg-primary hover:bg-primary-dark text-surface inline-block rounded px-6 py-2 text-center text-sm font-medium transition-colors duration-150"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-surface-alt border-border text-text inline-block rounded border px-6 py-2 text-center text-sm font-medium transition-opacity duration-150 hover:opacity-90"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  href={settingIndex.url()}
                  className="bg-primary text-surface border-border inline-block rounded border px-6 py-2 text-center text-sm font-medium transition-opacity duration-150 hover:opacity-90"
                >
                  Open Settings
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  const shortTitle = animeTitle.length > 60 ? `${animeTitle.slice(0, 60)}...` : animeTitle;
  const metaDescription = `View community-voted content guide, severity ratings, and framing metrics for ${shortTitle} on Mamorulist.`;

  return (
    <>
      <AppHead title={animeTitle} meta={metaDescription} />
      <div className="mx-auto mb-8 w-full max-w-7xl overflow-hidden p-4 font-sans lg:pt-6 lg:pb-6">
        <div className="mb-6">
          <Breadcrumb title={animeTitle} />
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-4">
          <div className="min-w-0 lg:col-span-3">
            <MainInfo
              anime={anime}
              userWatchlist={userWatchlist}
              topComments={topComments}
              countComments={countComments}
              animeRelation={animeRelation}
            />
          </div>

          <div className="min-w-0 lg:col-span-1">
            <SideInfo triggers={triggers} anime={anime} />
          </div>
        </div>

        <div className="border-border mt-6 w-full max-w-full min-w-0 overflow-hidden border-t pt-6">
          <div className="w-full max-w-full min-w-0">
            {anime.rating === 'G - All Ages' ? (
              <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center text-emerald-600 dark:text-emerald-400">
                <h2 className="mb-3 text-xl font-bold tracking-wide">Safe for All Ages</h2>
                <p className="text-sm leading-relaxed">
                  This anime is officially rated <strong>G - All Ages</strong>. It is generally
                  appropriate for all audiences and does not contain content that requires trigger
                  warnings or community safety voting.
                </p>
              </div>
            ) : anime.rating === 'Rx - Hentai' ? (
              <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-600 dark:text-rose-400">
                <h2 className="mb-3 text-xl font-bold tracking-wide">Explicit Content</h2>
                <p className="text-sm leading-relaxed">
                  This anime is officially rated <strong>Rx - Hentai</strong>. Because it is
                  inherently intended for mature audiences and contains explicit sexual material.
                </p>
              </div>
            ) : (
              <>
                {/* Optional: Add a subtle advisory for R+ shows to guide your voters */}
                {anime.rating === 'R+ - Mild Nudity' && (
                  <div className="bg-surface-alt border-border text-text-muted mb-4 rounded-lg border p-3 text-center text-xs">
                    This show is officially rated R+ for nudity. Please focus your votes on
                    unrelated triggers (e.g., violence, abuse, phobias).
                  </div>
                )}

                {!isTriggerConsent && (
                  <TriggerConsent handleRevealTrigger={() => setIsTriggerConsent(true)} />
                )}
                <div className={!isTriggerConsent ? 'hidden' : 'w-full max-w-full min-w-0'}>
                  <TriggerWarning
                    triggers={triggers}
                    anime={anime}
                    userTriggerVote={userTriggerVote}
                    aiTriggerContext={aiTriggerContext}
                    countTriggerComments={countTriggerComments}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <AnimeRecs recs={animeRecs} />
      </div>
    </>
  );
};

ShowAnime.layout = (page: React.ReactNode) => <FrontLayout>{page}</FrontLayout>;

export default ShowAnime;
