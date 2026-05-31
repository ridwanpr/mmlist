import { Link, router } from '@inertiajs/react';
import { FiSearch } from 'react-icons/fi';
import { index as browseIndex } from '../../../actions/App/Http/Controllers/BrowseController';
import { show as showAnime } from '../../../actions/App/Http/Controllers/AnimeController';
import type React from 'react';
import { useState } from 'react';

type HeroProps = {
  staffPick: App.DTOs.AnimeData[];
};

const Hero = ({ staffPick }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.get(
      browseIndex.url({
        query: {
          query: searchQuery,
        },
      }),
    );
  };

  return (
    <section className="border-border bg-surface border-b">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <div className="max-w-xl">
            <h1 className="text-text font-serif text-4xl leading-[0.92] font-black tracking-tighter sm:text-5xl lg:text-6xl">
              Anime <span className="text-primary">trigger</span>
              <br />
              warnings.
            </h1>

            <p className="text-text mt-3 text-sm leading-7 sm:text-[15px]">
              Check crowdsourced content warnings before watching and track your personal library.
            </p>
          </div>

          <div className="w-full">
            <form onSubmit={handleSearch} className="w-full">
              <div className="bg-surface-alt ring-border focus-within:ring-primary/30 relative flex h-12 items-center rounded-lg shadow-sm ring-1 transition focus-within:ring-2">
                <FiSearch className="text-text-muted pointer-events-none absolute left-4 h-5 w-5" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search anime... e.g., Your Name / Kimi no Na wa / 君の名は"
                  className="text-text placeholder:text-text-muted/60 h-full w-full bg-transparent pr-28 pl-12 text-[15px] outline-none"
                />

                <button
                  type="submit"
                  className="bg-primary text-surface hover:bg-primary-dark absolute right-1.5 h-9 rounded-md px-4 text-sm font-semibold transition hover:cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {staffPick && staffPick.length > 0 && (
              <div className="mt-4">
                <div className="text-text-muted mb-2 text-[11px] font-bold tracking-[0.18em] uppercase">
                  Staff Picks
                </div>

                <div className="flex flex-wrap gap-2">
                  {staffPick.map(item => (
                    <Link
                      key={item.slug}
                      href={showAnime.url(item.slug)}
                      prefetch={['click', 'hover']}
                      className="border-border bg-surface-alt/40 text-text hover:border-primary/20 hover:bg-primary-soft/30 hover:text-primary-dark rounded-lg border px-2.5 py-1 text-xs font-medium transition"
                    >
                      {item.title_english || item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
