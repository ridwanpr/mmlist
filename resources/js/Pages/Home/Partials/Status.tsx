import { LuShieldCheck, LuStar, LuUsers, LuVote } from "react-icons/lu";

const Status = () => {
  return (
    <div className="mb-4 px-4 sm:px-6 lg:-mt-6 lg:px-8">
      <div className="bg-background border-surface mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-surface flex items-center gap-3.5 border-b px-5 py-4 sm:px-6 lg:border-r lg:border-b-0">
            <LuUsers size={24} className="text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-lg leading-tight font-bold">12,500+</p>
              <p className="text-muted-foreground text-sm">Community Member</p>
            </div>
          </div>

          <div className="border-surface flex items-center gap-3.5 border-b px-5 py-4 sm:border-b-0 sm:px-6 lg:border-r lg:border-b-0">
            <LuShieldCheck size={24} className="text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-lg leading-tight font-bold">8,000+</p>
              <p className="text-muted-foreground text-sm">Anime Covered</p>
            </div>
          </div>

          <div className="border-surface flex items-center gap-3.5 border-b px-5 py-4 sm:px-6 lg:border-r lg:border-b-0">
            <LuVote size={24} className="text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-lg leading-tight font-bold">8,000+</p>
              <p className="text-muted-foreground text-sm">Votes Cast</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-5 py-4 sm:px-6">
            <LuStar size={24} className="text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-lg leading-tight font-bold">3,900+</p>
              <p className="text-muted-foreground text-sm">User Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
