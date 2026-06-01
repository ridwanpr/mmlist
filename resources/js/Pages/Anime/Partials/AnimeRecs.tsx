import React from 'react';
import { Link } from '@inertiajs/react';
import { useImageProxy } from '../../../utils/image-proxy';

interface AnimeRecsProps {
  recs: App.DTOs.AnimeData[];
}

const AnimeRecs = ({ recs }: AnimeRecsProps) => {
  const { proxyImage } = useImageProxy();

  if (!recs || recs.length === 0) return null;

  return (
    <div className="border-border mt-8 w-full border-t pt-8">
      <h2 className="text-text mb-4 text-base font-bold tracking-tight">Recommended Entries</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {recs.slice(0, 6).map(rec => {
          const coverImage = proxyImage(rec.images?.webp?.image_url || rec.images?.jpg?.image_url);
          const displayTitle = rec.title_english ?? rec.title;

          return (
            <Link
              key={rec.mal_id}
              href={`/anime/${rec.slug}`}
              className="group flex min-w-0 flex-col"
            >
              {/* Poster Card Asset */}
              <div className="bg-surface border-border aspect-3/4 w-full overflow-hidden rounded-xl border shadow-xs transition-opacity duration-150 group-hover:opacity-90">
                <img
                  src={coverImage}
                  alt={`${displayTitle} cover`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Poster Typography Context */}
              <div className="mt-2 min-w-0 flex-1">
                <h3 className="text-text group-hover:text-primary line-clamp-2 font-sans text-xs leading-snug font-semibold transition-colors duration-150">
                  {displayTitle}
                </h3>
                {rec.type && (
                  <p className="text-text-muted mt-0.5 text-[11px] font-medium">
                    {rec.type} {rec.year ? `• ${rec.year}` : ''}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AnimeRecs;
