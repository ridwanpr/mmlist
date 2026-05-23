import { LuReply } from "react-icons/lu";

const QuoteBlock = ({
  authorName,
  body,
}: {
  authorName: string;
  body: string;
}) => (
  <div className="bg-surface-alt border-primary mb-2.5 mt-2.5 rounded-r-md border-l-[3px] px-3 py-2">
    <p className="text-primary mb-1 flex items-center gap-1 text-[11px] font-bold">
      <LuReply className="size-2.75" />
      {authorName}
    </p>
    <p className="text-text-muted line-clamp-2 text-[12px] leading-relaxed">
      {body}
    </p>
  </div>
);

export default QuoteBlock;
