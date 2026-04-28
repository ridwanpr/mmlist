import { Link, usePage } from "@inertiajs/react";

const Hero = () => {
  const { routes } = usePage().props;

  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-serif text-4xl font-extrabold tracking-wide xl:text-5xl">
            Know what to expect.{" "}
            <span className="text-primary block sm:inline">
              Enjoy what you love.
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-600">
            Mamorulist provides trigger warning information for anime so you can
            protect your peace of mind and enjoy what matters to you.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="mm-btn-primary bg-primary text-surface flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold transition hover:cursor-pointer hover:opacity-90 sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              href={routes["browse.index"]}
              className="bg-surface text-primary border-primary flex w-full items-center justify-center gap-2 rounded-md border px-6 py-3 font-semibold transition hover:cursor-pointer hover:bg-gray-50 sm:w-auto"
            >
              Browse Anime
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
