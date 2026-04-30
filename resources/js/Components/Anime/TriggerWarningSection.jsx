import { useState } from "react";
import {
  LuShield,
  LuBrain,
  LuCircleAlert,
  LuFlame,
  LuHeart,
  LuChevronDown,
  LuUsers,
  LuCircleCheck,
} from "react-icons/lu";

// --- Dummy Data ---

const triggerCategories = [
  {
    id: "violence",
    icon: LuShield,
    name: "Violence & Gore",
    summary: "Frequent graphic combat, dismemberment, and body horror",
    frequencyLevel: 5,
    frequencyLabel: "Very Frequent",
    rating: 4.8,
    voteCount: 1842,
    confidence: 94,
    triggers: [
      {
        id: "v1",
        name: "Character Death",
        description:
          "Multiple named characters die throughout the series, including main cast members",
        severity: "severe",
        votes: 1621,
      },
      {
        id: "v2",
        name: "Graphic Gore / Body Horror",
        description:
          "Explicit depictions of dismemberment, titan transformation, and grotesque body horror",
        severity: "severe",
        votes: 1480,
      },
      {
        id: "v3",
        name: "Prolonged Battle Violence",
        description:
          "Extended war sequences with mass casualties shown in graphic detail",
        severity: "high",
        votes: 1203,
      },
    ],
  },
  {
    id: "mental-health",
    icon: LuBrain,
    name: "Mental Health",
    summary: "Themes of trauma, PTSD, and psychological deterioration",
    frequencyLevel: 4,
    frequencyLabel: "Frequent",
    rating: 4.2,
    voteCount: 1231,
    confidence: 88,
    triggers: [
      {
        id: "m1",
        name: "PTSD & Flashbacks",
        description:
          "Characters experience recurring trauma-induced flashbacks and dissociative episodes",
        severity: "high",
        votes: 1102,
      },
      {
        id: "m2",
        name: "Psychological Breakdown",
        description:
          "Several characters undergo severe mental deterioration across the story",
        severity: "moderate",
        votes: 871,
      },
      {
        id: "m3",
        name: "Suicidal Ideation",
        description: "A character expresses a desire to die in specific scenes",
        severity: "high",
        votes: 694,
      },
    ],
  },
  {
    id: "death",
    icon: LuFlame,
    name: "Death & Grief",
    summary: "Pervasive loss of life and prolonged mourning arcs",
    frequencyLevel: 5,
    frequencyLabel: "Very Frequent",
    rating: 4.9,
    voteCount: 1956,
    confidence: 96,
    triggers: [
      {
        id: "d1",
        name: "Mass Casualties",
        description:
          "Large-scale loss of life depicted, including children and non-combatants",
        severity: "severe",
        votes: 1740,
      },
      {
        id: "d2",
        name: "Child Death",
        description: "Deaths of child characters are shown on screen",
        severity: "severe",
        votes: 1389,
      },
      {
        id: "d3",
        name: "Survivor's Guilt",
        description:
          "Characters deal with unresolved grief and guilt over multiple episodes",
        severity: "moderate",
        votes: 1024,
      },
    ],
  },
  {
    id: "trauma",
    icon: LuCircleAlert,
    name: "Trauma & Abuse",
    summary: "Child abuse, captivity, and systemic oppression themes",
    frequencyLevel: 3,
    frequencyLabel: "Occasional",
    rating: 3.8,
    voteCount: 892,
    confidence: 81,
    triggers: [
      {
        id: "tr1",
        name: "Child Abuse",
        description:
          "Flashbacks depict physical and emotional abuse of children",
        severity: "severe",
        votes: 782,
      },
      {
        id: "tr2",
        name: "Imprisonment & Captivity",
        description:
          "Characters are held captive and subjected to inhumane conditions",
        severity: "high",
        votes: 631,
      },
    ],
  },
  {
    id: "sexual",
    icon: LuHeart,
    name: "Sexual Content",
    summary: "Mild implied scenes only: no explicit content",
    frequencyLevel: 1,
    frequencyLabel: "Rare",
    rating: 1.2,
    voteCount: 412,
    confidence: 72,
    triggers: [
      {
        id: "s1",
        name: "Implied Intimacy",
        description:
          "Non-graphic implied romantic or intimate scenes between adult characters",
        severity: "mild",
        votes: 380,
      },
    ],
  },
];

// --- Config Maps ---

const SEVERITY_CONFIG = {
  mild: {
    label: "Mild",
    pill: "bg-severity-mild/10 text-severity-mild",
    dot: "bg-severity-mild",
    dots: 1,
  },
  moderate: {
    label: "Moderate",
    pill: "bg-severity-moderate/10 text-severity-moderate",
    dot: "bg-severity-moderate",
    dots: 2,
  },
  high: {
    label: "High",
    pill: "bg-severity-high/10 text-severity-high",
    dot: "bg-severity-high",
    dots: 3,
  },
  severe: {
    label: "Severe",
    pill: "bg-severity-severe/10 text-severity-severe",
    dot: "bg-severity-severe",
    dots: 4,
  },
};

const FREQUENCY_COLOR = {
  1: "text-severity-mild",
  2: "text-severity-mild",
  3: "text-severity-moderate",
  4: "text-severity-high",
  5: "text-severity-severe",
};

// --- Sub-components ---

const SeverityDots = ({ severity }) => {
  const cfg = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.mild;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i <= cfg.dots ? cfg.dot : "bg-border"}`}
        />
      ))}
    </div>
  );
};

const VotingPanel = ({ triggerId }) => {
  const [appeared, setAppeared] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const appearedOpts = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "unsure", label: "Unsure" },
  ];

  const severityOpts = [
    { value: "mild", label: "Mild" },
    { value: "moderate", label: "Moderate" },
    { value: "severe", label: "Severe" },
    { value: "very_severe", label: "Very Severe" },
  ];

  if (submitted) {
    return (
      <div className="bg-primary-soft/30 border-primary-soft mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5">
        <LuCircleCheck size={15} className="text-primary shrink-0" />
        <p className="text-primary text-xs font-semibold">
          Vote recorded: thank you!
        </p>
      </div>
    );
  }

  return (
    <div className="border-border/50 mt-3 space-y-3 border-t pt-3">
      <div>
        <p className="text-text-muted mb-2 text-[11px] font-bold tracking-wider uppercase">
          Did this appear?
        </p>
        <div className="flex flex-wrap gap-1.5">
          {appearedOpts.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                setAppeared(appeared === opt.value ? null : opt.value)
              }
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                appeared === opt.value
                  ? "bg-primary text-surface"
                  : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text border"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {appeared === "yes" && (
        <div>
          <p className="text-text-muted mb-2 text-[11px] font-bold tracking-wider uppercase">
            How severe was it?
          </p>
          <div className="flex flex-wrap gap-1.5">
            {severityOpts.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setSeverity(severity === opt.value ? null : opt.value)
                }
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  severity === opt.value
                    ? "bg-primary text-surface"
                    : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text border"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {appeared && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSubmitted(true)}
            className="bg-primary text-surface rounded-lg px-4 py-1.5 text-xs font-semibold transition hover:opacity-90 active:scale-95"
          >
            Submit Vote
          </button>
          <button
            onClick={() => setShowNote(!showNote)}
            className="text-text-muted hover:text-text text-xs underline underline-offset-2 transition"
          >
            {showNote ? "Hide note" : "Add a note"}
          </button>
        </div>
      )}

      {showNote && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional: describe the context or episode..."
          rows={2}
          className="border-border bg-surface text-text placeholder:text-text-muted/50 focus:ring-primary/40 w-full max-w-full resize-none rounded-lg border px-3 py-2 text-xs leading-relaxed focus:ring-1 focus:outline-none"
        />
      )}
    </div>
  );
};

const TriggerItem = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const cfg = SEVERITY_CONFIG[trigger.severity] ?? SEVERITY_CONFIG.mild;

  return (
    <div className="border-border/40 overflow-hidden rounded-lg border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left transition-colors outline-none"
      >
        <div className="hover:bg-surface-alt/50 flex w-full items-start gap-2 px-3 py-3 sm:gap-3 sm:px-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-text text-sm font-semibold wrap-break-word">
                {trigger.name}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${cfg.pill}`}
              >
                {cfg.label}
              </span>
            </div>
            <p className="text-text-muted mt-0.5 text-xs leading-relaxed wrap-break-word">
              {trigger.description}
            </p>
          </div>

          <div className="flex w-14 shrink-0 flex-col items-end gap-1 sm:w-auto">
            <SeverityDots severity={trigger.severity} />
            <span className="text-text-muted hidden text-[10px] sm:block">
              {trigger.votes.toLocaleString()} votes
            </span>
            <LuChevronDown
              size={13}
              className={`text-text-muted/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {open && (
        <div className="bg-surface-alt/30 px-3 pb-4 sm:px-4">
          <VotingPanel triggerId={trigger.id} />
        </div>
      )}
    </div>
  );
};

const CategoryCard = ({ category, isActive, onToggle }) => {
  const Icon = category.icon;
  const freqColor =
    FREQUENCY_COLOR[category.frequencyLevel] ?? "text-text-muted";

  return (
    <div
      className={`bg-surface overflow-hidden rounded-xl border transition-all duration-200 ${
        isActive ? "border-primary/40 shadow-sm" : "border-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left transition-colors outline-none"
      >
        <div className="hover:bg-surface-alt/40 flex w-full items-center gap-2 px-3 py-4 sm:gap-4 sm:px-5">
          <div className="bg-primary-soft shrink-0 rounded-lg p-1.5 sm:p-2">
            <Icon size={17} className="text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-text text-sm font-semibold wrap-break-word md:text-[15px]">
              {category.name}
            </p>
            <p className="text-text-muted mt-0.5 truncate text-xs">
              {category.summary}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden flex-col items-end gap-0.5 sm:flex">
              <span
                className={`text-[10px] font-bold tracking-wider uppercase ${freqColor}`}
              >
                {category.frequencyLabel}
              </span>
              <span className="text-text-muted text-[10px]">
                {category.rating} / 5.0
              </span>
            </div>
            <LuChevronDown
              size={17}
              className={`text-text-muted transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {isActive && (
        <div className="border-border border-t">
          <div className="bg-surface-alt/40 border-border grid grid-cols-2 gap-2 border-b px-3 py-3 sm:grid-cols-4 sm:gap-3 sm:px-5">
            <div>
              <p className="text-text-muted mb-0.5 text-[10px] font-bold tracking-wider uppercase">
                Frequency
              </p>
              <p className={`text-sm font-semibold ${freqColor}`}>
                {category.frequencyLabel}
              </p>
            </div>
            <div>
              <p className="text-text-muted mb-1.5 text-[10px] font-bold tracking-wider uppercase">
                Severity
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i <= category.frequencyLevel ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-text-muted mb-0.5 text-[10px] font-bold tracking-wider uppercase">
                <span className="sm:hidden">Votes</span>
                <span className="hidden sm:inline">Community Votes</span>
              </p>
              <p className="text-text text-sm font-semibold">
                {category.voteCount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-text-muted mb-0.5 text-[10px] font-bold tracking-wider uppercase">
                Confidence
              </p>
              <p className="text-text text-sm font-semibold">
                {category.confidence}%
              </p>
            </div>
          </div>

          <div className="space-y-2 px-3 py-4 sm:px-4">
            {category.triggers.map((trigger) => (
              <TriggerItem key={trigger.id} trigger={trigger} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TriggerWarningSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleToggle = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-8 w-full max-w-full overflow-hidden">
      <div className="mb-4">
        <div className="mb-1 flex items-center gap-2">
          <LuShield size={19} className="text-primary" />
          <h2 className="text-text text-lg font-bold">Trigger Warnings</h2>
        </div>
        <p className="text-text-muted text-sm">
          Community-rated content warnings. Tap any item to view details and
          vote.
        </p>
      </div>

      <div className="space-y-2.5">
        {triggerCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onToggle={() => handleToggle(category.id)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2">
        <LuUsers size={13} className="text-text-muted mt-0.5 shrink-0" />
        <p className="text-text-muted text-xs leading-relaxed wrap-break-word">
          All ratings are community-submitted. Mamorulist does not verify
          individual reports.{" "}
          <span className="text-primary cursor-pointer font-medium hover:underline">
            Learn how ratings work
          </span>
        </p>
      </div>
    </section>
  );
};

export default TriggerWarningSection;
