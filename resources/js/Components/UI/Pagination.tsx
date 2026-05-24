import { Link } from "@inertiajs/react";

interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

const Pagination = ({ links }: PaginationProps) => {
  // If there are only 3 links (Previous, Page 1, Next), pagination isn't necessary
  if (links.length <= 3) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {links.map((link, index) => {
        // Disabled state (e.g., "Previous" on page 1, or the "..." separators)
        if (link.url === null) {
          return (
            <div
              key={index}
              className="border-border bg-surface text-text-muted rounded border px-4 py-2 text-sm font-medium opacity-70"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          );
        }

        // Active and Inactive clickable states
        return (
          <Link
            key={index}
            href={link.url}
            prefetch={"click"}
            className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
              link.active
                ? "border-primary bg-primary text-surface hover:bg-primary-dark shadow-sm"
                : "border-border bg-surface text-text hover:bg-surface-alt"
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
