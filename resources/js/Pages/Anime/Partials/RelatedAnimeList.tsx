import { Link } from '@inertiajs/react';
import React from 'react';

interface RelatedAnimeListProps {
  animeRelations: App.DTOs.AnimeRelationData[];
}

export default function RelatedAnimeList({ animeRelations }: RelatedAnimeListProps) {
  const validRelations = animeRelations.filter(
    (item): item is App.DTOs.AnimeRelationData & { anime: App.DTOs.AnimeData } =>
      item.anime !== null,
  );

  const groupedRelations = validRelations.reduce<Record<string, App.DTOs.AnimeData[]>>(
    (acc, current) => {
      const type = current.relation_type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(current.anime);
      return acc;
    },
    {},
  );

  return (
    <div className="w-full min-w-0 space-y-4">
      {Object.entries(groupedRelations).map(([relationType, entries]) => (
        <div key={relationType} className="w-full min-w-0 space-y-1">
          <h3 className="text-text-muted font-sans text-[11px] font-bold tracking-wider uppercase">
            {relationType}
          </h3>

          <div className="divide-border/40 w-full min-w-0 divide-y">
            {entries.map(relatedAnime => {
              const displayTitle = relatedAnime.title_english || relatedAnime.title;
              const displayImage =
                relatedAnime.images?.webp?.image_url || relatedAnime.images?.jpg?.image_url;

              return (
                <div
                  key={relatedAnime.mal_id}
                  className="hover:bg-surface-alt/40 flex w-full min-w-0 items-center gap-2.5 py-1.5 transition-colors duration-150"
                >
                  {displayImage && (
                    <div className="bg-surface-alt h-10 w-7 shrink-0 overflow-hidden rounded-sm">
                      <img
                        src={displayImage}
                        alt={displayTitle}
                        className="h-full w-full object-cover select-none"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="perfection-fix min-w-0 flex-1">
                    <Link
                      href={`/anime/${relatedAnime.slug}`}
                      className="text-text hover:text-primary block truncate font-sans text-sm font-medium transition-colors duration-150"
                    >
                      {displayTitle}
                    </Link>

                    <div className="text-text-muted mt-0.5 flex items-center gap-1 truncate overflow-hidden font-sans text-xs whitespace-nowrap">
                      <span>{relatedAnime.type || 'Unknown'}</span>
                      <span className="text-border/70 select-none">·</span>
                      <span>{relatedAnime.year || 'TBA'}</span>
                      {relatedAnime.episodes !== null && (
                        <>
                          <span className="text-border/70 select-none">·</span>
                          <span>{relatedAnime.episodes} EP</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
