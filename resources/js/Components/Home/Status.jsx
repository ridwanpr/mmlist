import { LuShieldCheck, LuStar, LuUsers, LuVote } from "react-icons/lu";

const Status = () => {
  return (
    <div className="mb-4 flex justify-center px-4 lg:px-16">
      <div className="bg-background border-surface grid grid-cols-2 rounded-lg border sm:grid-cols-4">
        <div className="border-surface flex items-center gap-3.5 border-r border-b px-6 py-4 sm:border-b-0">
          <LuUsers size={24} className="text-primary shrink-0" />
          <div>
            <p className="text-lg leading-tight font-bold">12,500+</p>
            <p className="text-muted-foreground text-sm">Community Members</p>
          </div>
        </div>
        <div className="border-surface flex items-center gap-3.5 border-b px-6 py-4 sm:border-r sm:border-b-0">
          <LuShieldCheck size={24} className="text-primary shrink-0" />
          <div>
            <p className="text-lg leading-tight font-bold">8,000+</p>
            <p className="text-muted-foreground text-sm">Anime Covered</p>
          </div>
        </div>
        <div className="border-surface flex items-center gap-3.5 border-r px-6 py-4 sm:border-r">
          <LuVote size={24} className="text-primary shrink-0" />
          <div>
            <p className="text-lg leading-tight font-bold">8,000+</p>
            <p className="text-muted-foreground text-sm">Votes Cast</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5 px-6 py-4">
          <LuStar size={24} className="text-primary shrink-0" />
          <div>
            <p className="text-lg leading-tight font-bold">3,900+</p>
            <p className="text-muted-foreground text-sm">User Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
