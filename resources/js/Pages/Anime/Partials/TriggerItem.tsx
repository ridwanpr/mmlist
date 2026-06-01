import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { HiMiniSparkles } from 'react-icons/hi2';
import { LuCheck, LuChevronDown, LuX } from 'react-icons/lu';
import VoteGroup from './VoteGroup';
import AuthGate from './AuthGate';
import { getTriggerComment } from '../../../actions/App/Http/Controllers/TriggerCommentController';

interface TriggerItemProps {
  triggerContent: App.DTOs.TriggerContentData;
  animeSlug: string;
  userTriggerVote: App.DTOs.AnimeTriggerData[] | null;
  aiTriggerContext: App.DTOs.AnimeTriggerContextData[] | null;
  isCompact?: boolean;
  countTriggerComments: Record<number, number>;
}

export interface VoteProps {
  appears: string;
  severity: string;
  framing: string;
}

const TriggerItem = ({
  triggerContent,
  animeSlug,
  userTriggerVote,
  aiTriggerContext,
  isCompact = false,
  countTriggerComments,
}: TriggerItemProps) => {
  const { auth, routes } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);

  const findUserTriggerVote = userTriggerVote?.find(userVote => {
    if (userVote.user_id === auth.user?.id && userVote.trigger_content_id === triggerContent.id) {
      return true;
    }
  });

  const findAITriggerContext = aiTriggerContext?.find(triggerContext => {
    if (triggerContext.trigger_content_id === triggerContent.id) {
      return true;
    }
  });

  let mapAppearsValue;
  if (findUserTriggerVote !== undefined) {
    mapAppearsValue = findUserTriggerVote.is_appear ? 'Yes' : 'No';
  }

  const { data, setData, post, errors, processing } = useForm<VoteProps>({
    appears: mapAppearsValue || '',
    severity: findUserTriggerVote?.severity || '',
    framing: findUserTriggerVote?.framing || '',
  });

  const handleVoteChange = (category: keyof VoteProps, option: string) => {
    setData(category, option);
  };

  const handleSubmit = (e: React.FormEvent, triggerContentId: number) => {
    e.preventDefault();
    post(`/vote-anime-trigger/${triggerContentId}/${animeSlug}`, {
      preserveScroll: true,
    });
  };

  const isLoggedIn = auth.user !== null;
  const toggleTrigger = () => setIsOpen(prev => !prev);

  return (
    <li
      className={`w-full max-w-full min-w-0 overflow-hidden rounded-lg border ${
        isCompact ? 'border-l-2' : 'border-l-4'
      } ${
        findUserTriggerVote
          ? 'border-primary border-l-primary-dark bg-surface'
          : 'border-border bg-surface border-l-transparent'
      }`}
    >
      {/* Clickable Header Area */}
      <button
        type="button"
        onClick={toggleTrigger}
        className={`hover:bg-surface-alt focus-visible:ring-border w-full max-w-full min-w-0 text-left transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
          isCompact
            ? 'flex flex-col gap-3 p-3.5 text-xs sm:grid sm:grid-cols-12 sm:items-center sm:gap-x-6 md:gap-x-8 lg:gap-x-10'
            : 'flex flex-col gap-4 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3'
        }`}
      >
        {isCompact ? (
          /* ================= COMPACT VIEW LAYOUT ================= */
          <>
            {/* Column 1: Core Content Label */}
            <div className="flex w-full min-w-0 items-center justify-between gap-4 sm:col-span-4 sm:w-auto md:col-span-4 lg:col-span-5">
              <span className="text-text min-w-0 flex-1 truncate text-sm font-semibold">
                {triggerContent.name}
              </span>
              <Link
                href={getTriggerComment.url({
                  animeslug: animeSlug,
                  triggerContentSlug: triggerContent.slug,
                })}
                prefetch
                className="text-primary shrink-0 text-[11px] font-medium hover:underline"
                onClick={e => e.stopPropagation()}
              >
                {countTriggerComments[triggerContent.id]
                  ? `Discussion (${countTriggerComments[triggerContent.id]})`
                  : 'Discussion'}
              </Link>
            </div>

            {/* Column 2: Total Community Voting Metrics */}
            <div className="hidden items-center gap-4 sm:col-span-3 sm:flex md:col-span-3 lg:col-span-2">
              <span className="text-text-muted shrink-0 text-[10px] font-bold tracking-wider uppercase">
                Appears?
              </span>
              <div className="flex items-center gap-3">
                <span className="text-success flex items-center gap-1 font-semibold">
                  <LuCheck />
                  <span className="tabular-nums">{triggerContent.stats?.appear_true}</span>
                </span>
                <span className="text-accent-red flex items-center gap-1 font-semibold">
                  <LuX />
                  <span className="tabular-nums">{triggerContent.stats?.appear_false}</span>
                </span>
              </div>
            </div>

            {/* Column 3: Full, Unabbreviated Severity Breakdown */}
            <div className="hidden items-center justify-between gap-2 sm:col-span-4 sm:flex md:col-span-4 lg:col-span-4">
              <span className="text-severity-mild text-xs font-medium">
                Mild{' '}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.severity.Mild}
                </strong>
              </span>
              <span className="text-severity-moderate text-xs font-medium">
                Moderate{' '}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.severity.Moderate}
                </strong>
              </span>
              <span className="text-severity-high text-xs font-medium">
                Severe{' '}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.severity.Severe}
                </strong>
              </span>
            </div>

            {/* Column 4: Status Badges & Layout Controls */}
            <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:col-span-1 sm:justify-end">
              {/* Mobile Fallback: Fully Spelled Out Wrapped Rows */}
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium sm:hidden">
                <span className="text-success flex shrink-0 items-center gap-0.5">
                  <LuCheck className="text-xs" />{' '}
                  <span className="tabular-nums">{triggerContent.stats?.appear_true}</span>
                </span>
                <span className="text-accent-red flex shrink-0 items-center gap-0.5">
                  <LuX className="text-xs" />{' '}
                  <span className="tabular-nums">{triggerContent.stats?.appear_false}</span>
                </span>

                <div className="border-border flex min-w-0 flex-wrap gap-x-2 gap-y-1 border-l pl-2.5 text-[10px]">
                  <span className="text-severity-mild shrink-0">
                    Mild:{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.severity.Mild}
                    </strong>
                  </span>
                  <span className="text-severity-moderate shrink-0">
                    Moderate:{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.severity.Moderate}
                    </strong>
                  </span>
                  <span className="text-severity-high shrink-0">
                    Severe:{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.severity.Severe}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                {findUserTriggerVote && (
                  <span className="bg-primary text-surface rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase">
                    Voted
                  </span>
                )}
                <LuChevronDown
                  className={`text-text-muted text-base transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </>
        ) : (
          /* ================= COMFORTABLE VIEW LAYOUT ================= */
          <>
            <div className="min-w-0 flex-1 sm:min-w-40">
              <p className="text-text text-sm font-semibold">{triggerContent.name}</p>
              <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
                {triggerContent?.description}
              </p>
              <Link
                href={getTriggerComment.url({
                  animeslug: animeSlug,
                  triggerContentSlug: triggerContent.slug,
                })}
                prefetch
                className="text-primary text-xs font-medium hover:underline"
                onClick={e => e.stopPropagation()}
              >
                {countTriggerComments[triggerContent.id]
                  ? `Discussion (${countTriggerComments[triggerContent.id]})`
                  : 'Discussion'}
              </Link>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
                <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
                  Severity
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-severity-mild text-xs">
                    Mild{' '}
                    <strong className="font-semibold tabular-nums">
                      {triggerContent.stats?.severity.Mild}
                    </strong>
                  </span>
                  <span className="text-severity-moderate text-xs">
                    Moderate{' '}
                    <strong className="font-semibold tabular-nums">
                      {triggerContent.stats?.severity.Moderate}
                    </strong>
                  </span>
                  <span className="text-severity-high text-xs">
                    Severe{' '}
                    <strong className="font-semibold tabular-nums">
                      {triggerContent.stats?.severity.Severe}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
                <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
                  Framing
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-text-muted text-xs">
                    Serious{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.framing.Serious}
                    </strong>
                  </span>
                  <span className="text-text-muted text-xs">
                    Neutral{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.framing.Neutral}
                    </strong>
                  </span>
                  <span className="text-text-muted text-xs">
                    Romanticized{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.framing.Romanticized}
                    </strong>
                  </span>
                  <span className="text-text-muted text-xs">
                    Comedic{' '}
                    <strong className="text-text font-semibold tabular-nums">
                      {triggerContent.stats?.framing.Comedic}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-between sm:w-auto sm:shrink-0 sm:justify-normal sm:gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-text-muted text-[10px] font-medium tracking-widest uppercase">
                  Appears?
                </span>
                <div className="flex gap-3">
                  <div className="flex w-10 flex-col items-center gap-0.5">
                    <strong className="text-success font-semibold tabular-nums">
                      {triggerContent.stats?.appear_true}
                    </strong>
                    <LuCheck className="text-success" />
                  </div>
                  <div className="flex w-10 flex-col items-center gap-0.5">
                    <strong className="text-accent-red font-semibold tabular-nums">
                      {triggerContent.stats?.appear_false}
                    </strong>
                    <LuX className="text-accent-red" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {findUserTriggerVote && (
                  <span className="bg-primary text-surface flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide">
                    <LuCheck className="text-xs" aria-hidden="true" />
                    Voted
                  </span>
                )}
                <LuChevronDown
                  className={`shrink-0 text-base transition-transform duration-200 ${
                    findUserTriggerVote ? 'text-primary-dark' : 'text-text-muted'
                  } ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
            </div>
          </>
        )}
      </button>

      {/* Expanded Actions Panel */}
      {isOpen && (
        <div className="border-border divide-border grid w-full max-w-full min-w-0 grid-cols-1 divide-y border-t md:grid-cols-[1fr_2fr] md:divide-x md:divide-y-0">
          {/* AI Automated Context */}
          <div className="bg-primary-soft/40 flex w-full min-w-0 flex-col gap-2 p-4">
            <p className="text-primary-dark flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase">
              <HiMiniSparkles className="text-sm" />
              AI Context
            </p>
            <p className="text-text-muted text-xs leading-relaxed break-words">
              {findAITriggerContext?.ai_summary ||
                'No AI summary is currently available. This content is awaiting evaluation.'}
            </p>
          </div>

          {/* Voting Action Segment */}
          <div className="flex w-full max-w-full min-w-0 flex-col gap-3 overflow-hidden p-4">
            {isLoggedIn ? (
              <>
                <p className="text-text-muted text-[10px] font-semibold tracking-widest uppercase">
                  Help Others Watch Safely
                </p>
                <form
                  onSubmit={e => handleSubmit(e, triggerContent.id)}
                  className="w-full max-w-full"
                >
                  <div className="flex w-full max-w-full flex-col gap-3">
                    <VoteGroup
                      label="Does this appear?"
                      options={['Yes', 'No']}
                      category="appears"
                      votes={data}
                      handleVoteChange={handleVoteChange}
                    />
                    {errors.appears && (
                      <p className="text-accent-red -mt-2 text-xs">{errors.appears}</p>
                    )}

                    {data.appears === 'Yes' && (
                      <>
                        <VoteGroup
                          label="Severity level"
                          options={['Mild', 'Moderate', 'Severe']}
                          category="severity"
                          votes={data}
                          handleVoteChange={handleVoteChange}
                        />
                        {errors.severity && (
                          <p className="text-accent-red -mt-2 text-xs">{errors.severity}</p>
                        )}
                        <VoteGroup
                          label="How is it framed?"
                          options={['Serious', 'Neutral', 'Romanticized', 'Comedic']}
                          category="framing"
                          votes={data}
                          handleVoteChange={handleVoteChange}
                        />
                        {errors.framing && (
                          <p className="text-accent-red -mt-2 text-xs">{errors.framing}</p>
                        )}
                      </>
                    )}

                    {(data.appears === 'No' ||
                      (data.appears === 'Yes' && data.severity && data.framing)) && (
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={processing}
                          className="bg-primary disabled:bg-primary/60 text-surface flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-opacity disabled:cursor-not-allowed"
                        >
                          {processing && (
                            <svg
                              className="h-3.5 w-3.5 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                          )}
                          {processing ? 'Submitting...' : 'Submit Vote'}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <AuthGate loginHref={routes['login']} registerHref={routes['auth.register']} />
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default TriggerItem;
