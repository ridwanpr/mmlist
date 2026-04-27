import { Link } from "@inertiajs/react";
import { LuShieldAlert } from "react-icons/lu";

const CTA = () => {
  return (
    <div className="p-4 lg:py-8 mb-6">
      <div className="bg-primary-soft border-surface-alt mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-lg border p-6 text-center md:flex-row md:p-8 md:text-left">
        <div className="shrink-0">
          <LuShieldAlert size={70} className="text-primary" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-text font-serif text-2xl font-bold md:text-3xl">
            You're not Alone.
          </h2>
          <p className="text-base opacity-80 md:text-lg">
            Together, we're creating a safer space for anime fans everywhere.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 md:items-end">
          <Link
            href="#"
            className="bg-primary text-surface inline-flex items-center justify-center rounded-lg px-8 py-3 font-semibold transition-opacity hover:opacity-90"
          >
            Join Mamorulist
          </Link>
          <p className="text-sm opacity-70">Free to join. Always will be.</p>
        </div>
      </div>
    </div>
  );
};

export default CTA;
