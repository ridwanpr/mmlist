import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { HiMiniSparkles } from "react-icons/hi2";
import {
  LuCheck,
  LuChevronDown,
  LuThumbsDown,
  LuThumbsUp,
} from "react-icons/lu";
import VoteGroup from "./VoteGroup";
import AuthGate from "./AuthGate";

interface TriggerItemProps {
  triggerContent: App.DTOs.TriggerContentData;
  animeSlug: string;
  userTriggerVote: App.DTOs.AnimeTriggerData[] | null;
  aiTriggerContext: App.DTOs.AnimeTriggerContextData[] | null;
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
}: TriggerItemProps) => {
  const { auth, routes } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);

  const findUserTriggerVote = userTriggerVote?.find((userVote) => {
    if (
      userVote.user_id === auth.user?.id &&
      userVote.trigger_content_id === triggerContent.id
    ) {
      return true;
    }
  });

  const findAITriggerContext = aiTriggerContext?.find((triggerContext) => {
    if (triggerContext.trigger_content_id === triggerContent.id) {
      return true;
    }
  });

  let mapAppearsValue;
  if (findUserTriggerVote !== undefined) {
    mapAppearsValue = findUserTriggerVote.is_appear ? "Yes" : "No";
  }

  const { data, setData, post, errors, processing } = useForm<VoteProps>({
    appears: mapAppearsValue || "",
    severity: findUserTriggerVote?.severity || "",
    framing: findUserTriggerVote?.framing || "",
  });

  const handleVoteChange = (category: keyof VoteProps, option: string) => {
    setData(category, option);
  };

  const handleSubmit = (e: React.SubmitEvent, triggerContentId: number) => {
    e.preventDefault();
    post(`/vote-anime-trigger/${triggerContentId}/${animeSlug}`, {
      preserveScroll: true,
    });
  };

  const isLoggedIn = auth.user !== null;

  const toggleTrigger = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-l-4 ${
        findUserTriggerVote
          ? "border-primary border-l-primary-dark bg-surface"
          : "border-border bg-surface border-l-transparent"
      }`}
    >
      {/* Header Row */}
      <button
        type="button"
        onClick={toggleTrigger}
        className="hover:bg-surface-alt focus-visible:ring-border flex w-full flex-col gap-4 self-start p-4 text-left transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3"
      >
        {/* Left - Name & Description */}
        <div className="min-w-0 flex-1 sm:min-w-40">
          <p className="text-text text-sm font-semibold">
            {triggerContent.name}
          </p>
          <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
            {triggerContent?.description}
          </p>
          <Link
            href="#"
            prefetch
            className="text-primary text-xs font-medium hover:underline"
          >
            Discussion (32)
          </Link>
        </div>

        {/* Middle - Severity & Framing */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Severity */}
          <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
            <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
              Severity
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-severity-mild text-xs">
                Mild{" "}
                <strong className="font-semibold tabular-nums">
                  {triggerContent.stats?.severity.Mild}
                </strong>
              </span>
              <span className="text-severity-moderate text-xs">
                Moderate{" "}
                <strong className="font-semibold tabular-nums">
                  {triggerContent.stats?.severity.Moderate}
                </strong>
              </span>
              <span className="text-severity-high text-xs">
                Severe{" "}
                <strong className="font-semibold tabular-nums">
                  {triggerContent.stats?.severity.Severe}
                </strong>
              </span>
            </div>
          </div>

          {/* Framing */}
          <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
            <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
              Framing
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-text-muted text-xs">
                Serious{" "}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.framing.Serious}
                </strong>
              </span>
              <span className="text-text-muted text-xs">
                Neutral{" "}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.framing.Neutral}
                </strong>
              </span>
              <span className="text-text-muted text-xs">
                Romanticized{" "}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.framing.Romanticized}
                </strong>
              </span>
              <span className="text-text-muted text-xs">
                Comedic{" "}
                <strong className="text-text font-semibold tabular-nums">
                  {triggerContent.stats?.framing.Comedic}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right - Appears? + Voted badge + Chevron */}
        <div className="flex items-center justify-between sm:shrink-0 sm:justify-normal sm:gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-text-muted text-[10px] font-medium tracking-widest uppercase">
              Appears?
            </span>
            <div className="flex gap-3">
              <div className="flex w-10 flex-col items-center gap-0.5">
                <strong className="text-success text-sm font-semibold tabular-nums">
                  {triggerContent.stats?.appear_true}
                </strong>
                <LuThumbsUp className="text-success text-base" />
              </div>
              <div className="flex w-10 flex-col items-center gap-0.5">
                <strong className="text-accent-red text-sm font-semibold tabular-nums">
                  {triggerContent.stats?.appear_false}
                </strong>
                <LuThumbsDown className="text-accent-red text-base" />
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
                findUserTriggerVote ? "text-primary-dark" : "text-text-muted"
              } ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>
      </button>

      {/* Expanded Panel */}
      {isOpen && (
        <div className="border-border divide-border grid grid-cols-1 divide-y border-t md:grid-cols-[1fr_2fr] md:divide-x md:divide-y-0">
          {/* AI Context */}
          <div className="bg-primary-soft/40 flex flex-col gap-2 p-4">
            <p className="text-primary-dark flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase">
              <HiMiniSparkles className="text-sm" />
              AI Context
            </p>
            <p className="text-text-muted text-xs leading-relaxed">
              {findAITriggerContext?.ai_summary ||
                "No AI summary is currently available. This content is awaiting evaluation."}
            </p>
          </div>

          {/* Vote Section */}
          <div className="flex flex-col gap-3 p-4">
            {isLoggedIn ? (
              <>
                <p className="text-text-muted text-[10px] font-semibold tracking-widest uppercase">
                  Help Others Watch Safely
                </p>
                <form onSubmit={(e) => handleSubmit(e, triggerContent.id)}>
                  <div className="flex flex-col gap-3">
                    <VoteGroup
                      label="Does this appear?"
                      options={["Yes", "No"]}
                      category="appears"
                      votes={data}
                      handleVoteChange={handleVoteChange}
                    />
                    {errors.appears && (
                      <p className="text-accent-red -mt-2 text-xs">
                        {errors.appears}
                      </p>
                    )}

                    {data.appears === "Yes" && (
                      <>
                        <VoteGroup
                          label="Severity level"
                          options={["Mild", "Moderate", "Severe"]}
                          category="severity"
                          votes={data}
                          handleVoteChange={handleVoteChange}
                        />
                        {errors.severity && (
                          <p className="text-accent-red -mt-2 text-xs">
                            {errors.severity}
                          </p>
                        )}
                        <VoteGroup
                          label="How is it framed?"
                          options={[
                            "Serious",
                            "Neutral",
                            "Romanticized",
                            "Comedic",
                          ]}
                          category="framing"
                          votes={data}
                          handleVoteChange={handleVoteChange}
                        />
                        {errors.framing && (
                          <p className="text-accent-red -mt-2 text-xs">
                            {errors.framing}
                          </p>
                        )}
                      </>
                    )}

                    {(data.appears === "No" ||
                      (data.appears === "Yes" &&
                        data.severity &&
                        data.framing)) && (
                      <>
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
                            {processing ? "Submitting..." : "Submit Vote"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <AuthGate
                loginHref={routes["login"]}
                registerHref={routes["auth.register"]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TriggerItem;
