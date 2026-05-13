import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { HiMiniSparkles } from "react-icons/hi2";
import { LuChevronDown, LuThumbsDown, LuThumbsUp } from "react-icons/lu";

import AuthGate from "./AuthGate";
import VoteGroup from "./VoteGroup";

interface TriggerItemProps {
  triggerContent: App.DTOs.TriggerContentData;
}

export interface VoteProps {
  appears: string;
  severity: string;
  framing: string;
}

const TriggerItem = ({ triggerContent }: TriggerItemProps) => {
  const { auth, routes } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);

  const [votes, setVotes] = useState<VoteProps>({
    appears: "",
    severity: "",
    framing: "",
  });

  const handleVoteChange = (category: keyof VoteProps, option: string) => {
    console.log(category, option);
    setVotes((prev) => ({
      ...prev,
      [category]: option,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent, triggerContentId: number) => {
    e.preventDefault();
    console.log(triggerContentId, votes);
    // submit form
  };

  const isLoggedIn = auth.user !== null;

  const toggleTrigger = () => setIsOpen((prev) => !prev);

  return (
    <div className="border-border bg-surface overflow-hidden rounded-lg border">
      {/* Header Row */}
      <button
        type="button"
        onClick={toggleTrigger}
        className="hover:bg-surface-alt focus-visible:ring-border flex w-full flex-col gap-4 self-start p-4 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3"
      >
        {/* Left — Name & Description */}
        <div className="min-w-0 flex-1 sm:min-w-40">
          <p className="text-text text-sm font-semibold">
            {triggerContent.name}
          </p>
          <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
            {triggerContent?.description}
          </p>
        </div>

        {/* Middle — Severity & Framing */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Severity */}
          <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
            <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
              Severity
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-accent-gold text-xs">
                Mild <strong className="font-semibold tabular-nums">10</strong>
              </span>
              <span className="text-accent-orange text-xs">
                Moderate{" "}
                <strong className="font-semibold tabular-nums">10</strong>
              </span>
              <span className="text-accent-red text-xs">
                Severe{" "}
                <strong className="font-semibold tabular-nums">10</strong>
              </span>
              <span className="text-accent-rose text-xs">
                Extreme{" "}
                <strong className="font-semibold tabular-nums">10</strong>
              </span>
            </div>
          </div>

          {/* Framing */}
          <div className="xs:flex-row xs:items-baseline xs:gap-3 flex flex-col gap-1">
            <span className="text-text-muted w-14 shrink-0 text-[10px] font-medium tracking-widest uppercase">
              Framing
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {["Serious", "Neutral", "Romanticized", "Comedic"].map(
                (label) => (
                  <span key={label} className="text-text-muted text-xs">
                    {label}{" "}
                    <strong className="text-text font-semibold tabular-nums">
                      10
                    </strong>
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Right — Appears? + Chevron */}
        <div className="flex items-center justify-between sm:shrink-0 sm:justify-normal sm:gap-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-text-muted text-[10px] font-medium tracking-widest uppercase">
              Appears?
            </span>
            <div className="flex gap-3">
              <div className="flex w-10 flex-col items-center gap-0.5">
                <strong className="text-success text-sm font-semibold tabular-nums">
                  10
                </strong>
                <LuThumbsUp className="text-success text-base" />
              </div>
              <div className="flex w-10 flex-col items-center gap-0.5">
                <strong className="text-accent-red text-sm font-semibold tabular-nums">
                  10
                </strong>
                <LuThumbsDown className="text-accent-red text-base" />
              </div>
            </div>
          </div>

          <LuChevronDown
            className={`text-text-muted shrink-0 text-base transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              natus, saepe in earum fugit odit dolores esse voluptatem possimus
              corporis dicta, harum delectus.
            </p>
          </div>

          {/* Vote Section */}
          <div className="flex flex-col gap-3 p-4">
            {isLoggedIn ? (
              <>
                <p className="text-text-muted text-[10px] font-semibold tracking-widest uppercase">
                  Share your experience
                </p>
                <form onSubmit={(e) => handleSubmit(e, triggerContent.id)}>
                  <div className="flex flex-col gap-3">
                    <VoteGroup
                      label="Does this appear?"
                      options={["Yes", "No"]}
                      category="appears"
                      votes={votes}
                      handleVoteChange={handleVoteChange}
                    />
                    <VoteGroup
                      label="Severity level"
                      options={["Mild", "Moderate", "Severe", "Extreme"]}
                      category="severity"
                      votes={votes}
                      handleVoteChange={handleVoteChange}
                    />
                    <VoteGroup
                      label="How is it framed?"
                      options={[
                        "Serious",
                        "Neutral",
                        "Romanticized",
                        "Comedic",
                      ]}
                      category="framing"
                      votes={votes}
                      handleVoteChange={handleVoteChange}
                    />

                    <button
                      type="submit"
                      className="bg-primary rounded px-2 py-1 text-white"
                    >
                      Submit Vote
                    </button>
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
