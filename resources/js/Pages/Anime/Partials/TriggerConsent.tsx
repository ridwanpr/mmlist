type TriggerConsentProps = {
  handleRevealTrigger: () => void;
};

const TriggerConsent = ({ handleRevealTrigger }: TriggerConsentProps) => {
  return (
    <div className="bg-surface border-border mx-auto flex flex-col items-center rounded-xl border p-6 text-center">
      <h2 className="text-text mb-1 font-serif text-lg font-bold">Content Guide</h2>

      <p className="text-text-muted mb-4 font-sans text-sm leading-normal">
        Review community-submitted content guide and thematic tags. <br />
        This section contains detailed database breakdowns that may include story spoilers.
      </p>

      <button
        onClick={handleRevealTrigger}
        className="bg-primary hover:bg-primary-dark text-background cursor-pointer rounded-lg px-5 py-2 font-sans text-sm font-semibold transition-colors duration-200"
      >
        Reveal Content
      </button>
    </div>
  );
};

export default TriggerConsent;
