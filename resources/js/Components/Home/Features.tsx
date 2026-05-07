import { LuBookmark, LuSearch, LuShieldCheck, LuUsers } from "react-icons/lu";

const Features = () => {
  return (
    <div className="mx-auto max-w-7xl p-4 lg:py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-serif text-2xl font-bold lg:text-3xl">
          Everything you need to watch with confidence
        </h2>
        <p className="text-text-muted text-sm lg:text-base">
          Built by anime fans, for anime fans
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
          <div className="bg-background shrink-0 rounded-full p-6">
            <LuSearch size={40} className="text-primary" />
          </div>
          <h3 className="text-text text-xl font-semibold">
            Search and Discover
          </h3>
          <p className="text-text-muted text-base leading-relaxed">
            Find any anime and see community-rated trigger warnings before you
            start.
          </p>
        </div>

        <div className="border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
          <div className="bg-background shrink-0 rounded-full p-6">
            <LuShieldCheck size={40} className="text-primary" />
          </div>
          <h3 className="text-text text-xl font-semibold">
            Detailed Trigger Info
          </h3>
          <p className="text-text-muted text-base leading-relaxed">
            See which trigger appear and how frequently based on real user
            experiences.
          </p>
        </div>

        <div className="border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
          <div className="bg-background shrink-0 rounded-full p-6">
            <LuUsers size={40} className="text-primary" />
          </div>
          <h3 className="text-text text-xl font-semibold">Community Driven</h3>
          <p className="text-text-muted text-base leading-relaxed">
            Vote, reviews, help others by sharing your experiences with trigger
            content.
          </p>
        </div>

        <div className="border-border flex flex-col items-center gap-4 rounded-lg border p-8 text-center">
          <div className="bg-background shrink-0 rounded-full p-6">
            <LuBookmark size={40} className="text-primary" />
          </div>
          <h3 className="text-text text-xl font-semibold">Save & Track</h3>
          <p className="text-text-muted text-base leading-relaxed">
            Save anime to your watchlist, track your progress, and manage what
            you watch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
