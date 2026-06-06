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
        </div>
        <p className="text-text/90 text-sm leading-relaxed text-pretty">
          {anime.ai_advisory || 'Not yet available'}
        </p>
      </div>

      {/* Content Metrics Profile */}
      <div className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-text flex items-center gap-2 font-bold">Content Profile</h3>
          <p className="text-text-muted mt-1 text-xs text-pretty">
            Statistical distribution of descriptors verified by the community.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Tracked Attributes</span>
            <span className="text-text text-xs font-bold">{stats.totalTriggers}</span>
          </div>

          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Reported Flags</span>
            <span className="text-text text-xs font-bold">{stats.presentTriggers}</span>
          </div>

          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Unflagged Items</span>
            <span className="text-text text-xs font-bold">{stats.absentTriggers}</span>
          </div>

          <div className="bg-background flex items-center justify-between rounded px-3 py-2">
            <span className="text-text/90 text-sm font-medium">Total Votes</span>
            <span className="text-text text-xs font-bold">{stats.totalReports}</span>
          </div>
        </div>
      </div>

      <div className="border-primary/20 bg-primary-soft rounded-lg border p-5 text-center shadow-sm">
        <div className="bg-primary/10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full">
          <LuUsers className="text-primary" size={20} />
        </div>
        <h3 className="text-text mb-1 font-bold">Data Feedback</h3>
        <p className="text-text-muted mb-4 text-xs leading-relaxed">
          Spot an inaccuracy or missing database information? Submitting an entry update helps
          maintain index accuracy.
        </p>
        <Link
          href={index.url()}
          prefetch={'click'}
          className="bg-primary focus:ring-primary text-surface w-full rounded-md px-2 py-2 text-sm font-semibold transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};
