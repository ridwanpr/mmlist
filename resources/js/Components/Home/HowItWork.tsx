import {
  LuChevronRight,
  LuCircleCheck,
  LuSearch,
  LuShieldCheck,
} from "react-icons/lu";

const HowItWork = () => {
  return (
    <div className="mx-auto max-w-5xl p-4 lg:py-12">
      <h2 className="text-text mb-12 text-center font-serif text-2xl font-bold lg:text-3xl">
        How it works
      </h2>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-4 lg:gap-8">
        <div className="flex max-w-62.5 flex-1 flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="bg-primary absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md">
              1
            </div>
            <div className="bg-surface border-surface-alt flex h-24 w-24 shrink-0 items-center justify-center rounded-full border">
              <LuSearch size={40} className="text-primary" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-text font-semibold">Find an anime</h3>
            <p className="text-text-muted mt-1 text-sm">
              Search for any anime you want to watch.
            </p>
          </div>
        </div>

        <div className="hidden h-24 items-center justify-center md:flex">
          <LuChevronRight size={40} className="text-text-muted font-light" />
        </div>

        <div className="flex max-w-62.5 flex-1 flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="bg-primary absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md">
              2
            </div>
            <div className="bg-surface border-surface-alt flex h-24 w-24 shrink-0 items-center justify-center rounded-full border">
              <LuShieldCheck size={40} className="text-primary" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-text font-semibold">Check trigger warnings</h3>
            <p className="text-text-muted mt-1 text-sm">
              See community-rated triggers and their intensity.
            </p>
          </div>
        </div>

        <div className="hidden h-24 items-center justify-center md:flex">
          <LuChevronRight size={40} className="text-text-muted font-light" />
        </div>
        <div className="flex max-w-62.5 flex-1 flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="bg-primary absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md">
              3
            </div>
            <div className="bg-surface border-surface-alt flex h-24 w-24 shrink-0 items-center justify-center rounded-full border">
              <LuCircleCheck size={40} className="text-primary" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-text font-semibold">Watch with confidence</h3>
            <p className="text-text-muted mt-1 text-sm">
              Make informed choice that are right for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
