import type React from "react";
import BackLayout from "../../../Layouts/BackLayout";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { router, Link } from "@inertiajs/react";
import { LuPencil, LuTrash } from "react-icons/lu";

type ManageAnimeProps = {
  animes: App.DTOs.PaginatedAnimeData;
};

const columns: ColumnDef<App.DTOs.AnimeData>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "season", header: "Season" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const anime = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link
            href="/admin/anime"
            className="bg-primary hover:bg-primary rounded px-3 py-1.5 text-sm text-surface transition-colors"
          >
            <LuPencil />
          </Link>
        </div>
      );
    },
  },
];

const ManageAnime = ({ animes }: ManageAnimeProps) => {
  const table = useReactTable({
    data: animes.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: animes.last_page,
    rowCount: animes.total,
  });

  const handlePagination = (url: string | null) => {
    if (!url) return;

    router.get(url, {}, { preserveState: true });
  };

  return (
    <div>
      <div className="mb-4">
        <h1>Manage Anime</h1>
      </div>
      <div className="bg-surface w-full overflow-hidden rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-surface-alt">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-2.5 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-surface">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-border border-y px-3 py-2.5"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end gap-2 px-4 pb-4">
          {animes.links.map((link, idx) => (
            <button
              key={idx}
              disabled={!link.url}
              onClick={() => handlePagination(link.url)}
              className={`rounded border px-3 py-1.5 text-sm transition-colors hover:cursor-pointer ${
                link.active
                  ? "border-border bg-surface-alt text-text"
                  : "bg-surface hover:bg-surface-alt border-border text-text"
              } ${!link.url ? "cursor-not-allowed opacity-40" : ""}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ManageAnime.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default ManageAnime;
