import { LuReply } from "react-icons/lu";

const QuoteBlock = ({
  authorName,
  body,
}: {
  authorName: string;
  body: string;
}) => (
  <div className="bg-surface-alt border-primary mt-2.5 mb-2.5 rounded-r-md border-l-[3px] px-3 py-2">
    <p className="text-primary mb-1 flex items-center gap-1 text-[11px] font-bold">
      <LuReply className="size-2.75" />
      {authorName}
    </p>
    <div className="text-text-muted line-clamp-2 text-[12px] leading-relaxed">
      <div
        className="prose prose-sm text-text/90 mt-1 mb-2 max-w-none text-xs whitespace-pre-wrap md:text-sm"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains("spoiler")) {
            target.classList.add("revealed");
          }
        }}
        dangerouslySetInnerHTML={{
          __html: body.trim(),
        }}
      />
    </div>
  </div>
);

export default QuoteBlock;
