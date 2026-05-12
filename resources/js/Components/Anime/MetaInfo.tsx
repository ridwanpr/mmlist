export const MetaInfo = ({
  label,
  value,
  items,
}: {
  label: string;
  value?: string | null;
  items?: { name: string }[] | null;
}) => {
  return (
    <div className="border-border border-b py-2 last:border-b-0">
      <div className="text-text-muted mb-0.5 text-[9px] font-bold tracking-wider uppercase">
        {label}
      </div>

      {items ? (
        items.length ? (
          <div className="flex flex-wrap gap-1">
            {items.map((item, i) => (
              <span
                key={i}
                className="border-border bg-surface-alt text-text/80 rounded border px-1 py-0.5 text-[10px] leading-none font-medium"
              >
                {item.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-text-muted text-xs italic">-</span>
        )
      ) : value ? (
        <span className="text-text/90 text-xs font-medium">{value}</span>
      ) : (
        <span className="text-text-muted text-xs italic">-</span>
      )}
    </div>
  );
};
