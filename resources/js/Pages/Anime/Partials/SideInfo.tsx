import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { LuUsers } from 'react-icons/lu';
import { index } from '../../../actions/App/Http/Controllers/ContactController';

interface SideInfoProps {
  triggers: App.DTOs.TriggerData[];
  anime: App.DTOs.AnimeData;
}

export const SideInfo = ({ triggers, anime }: SideInfoProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerContents = useMemo(
    () => triggers.flatMap(trigger => trigger.triggerContents ?? []),
    [triggers],
  );

  const stats = useMemo(() => {
    const totalTriggers = triggerContents.length;

    const totalReports = triggerContents.reduce(
      (sum, content) => sum + (content.animeTriggers?.length ?? 0),
      0,
    );

    const presentTriggers = triggerContents.filter(content => {
      const appearTrueFromStats = content.stats?.appear_true ?? 0;
      const appearTrueFromEntries = content.animeTriggers?.some(item => item.is_appear) ?? false;

      return appearTrueFromStats > 0 || appearTrueFromEntries;
    }).length;

    const absentTriggers = totalTriggers - presentTriggers;

    const mostUsedTrigger = triggerContents
      .filter(content => content.animeTriggers?.some(item => item.is_appear) ?? false)
      .reduce<App.DTOs.TriggerContentData | null>((best, current) => {
        const currentCount = current.animeTriggers?.filter(item => item.is_appear).length ?? 0;

        const bestCount = best?.animeTriggers?.filter(item => item.is_appear).length ?? 0;

        return currentCount > bestCount ? current : best;
      }, null);

    return {
      totalTriggers,
      totalReports,
      presentTriggers,
      absentTriggers,
      mostUsedTrigger,
    };
  }, [triggerContents]);

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:col-span-1">
      <div className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-text flex items-center gap-2 font-bold">Content Advisory</h3>
          {/*<span className="bg-primary text-surface flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
            <LuInfo size={12} />
            AI Powered
          </span>*/}
        </div>
        <p className="text-text/90 text-sm leading-relaxed text-pretty">
          {anime.ai_advisory || 'Not yet available'}
        </p>
      </div>

      {/*Trigger Profile*/}
      <div className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-text flex items-center gap-2 font-bold">Trigger Profile</h3>
          <p className="text-text-muted mt-1 text-xs text-pretty">
            Active triggers currently reported by the community.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Tracked Triggers</span>
            <span className="text-text text-xs font-bold">{stats.totalTriggers}</span>
          </div>

          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Confirmed Warnings</span>
            <span className="text-text text-xs font-bold">{stats.presentTriggers}</span>
          </div>

          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Unflagged</span>
            <span className="text-text text-xs font-bold">{stats.absentTriggers}</span>
          </div>

          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Community Votes</span>
            <span className="text-text text-xs font-bold">{stats.totalReports}</span>
          </div>
        </div>

        {stats.mostUsedTrigger && (
          <div className="bg-background mt-4 rounded p-3">
            <div className="text-text-muted text-[11px] font-semibold tracking-wider uppercase">
              Most reported trigger
            </div>
            <div className="relative mt-1 overflow-hidden">
              {/* Overlay Layer */}
              {!isRevealed && (
                <button
                  onClick={() => setIsRevealed(true)}
                  className="bg-background/90 text-text hover:bg-background/95 absolute inset-0 z-10 flex cursor-pointer items-center justify-center text-xs font-medium transition-colors"
                >
                  Click to reveal
                </button>
              )}
              <div className={!isRevealed ? 'blur-sm select-none' : ''}>
                <div className="text-text text-sm font-bold">
                  {stats.mostUsedTrigger?.name ?? 'None'}
                </div>
                <div className="text-text-muted text-xs">
                  {stats.mostUsedTrigger?.animeTriggers?.filter(item => item.is_appear).length ?? 0}{' '}
                  reported entries
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-primary/20 bg-primary-soft rounded-lg border p-5 text-center shadow-sm">
        <div className="bg-primary/10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
          <LuUsers className="text-primary" size={20} />
        </div>
        <h3 className="text-text mb-1 font-bold">Message Us</h3>
        <p className="text-text-muted mb-4 text-xs leading-relaxed">
          Spot a mistake or missing info? Let us know! Your feedback helps us make Mamorulist even
          better.
        </p>
        <Link
          href={index.url()}
          prefetch={'click'}
          className="bg-primary focus:ring-primary text-surface w-full rounded-md py-2 px-2 text-sm font-semibold transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Leave a Message
        </Link>
      </div>
    </div>
  );
};
