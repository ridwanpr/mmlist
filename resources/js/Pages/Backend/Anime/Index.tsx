import type React from "react";
import BackLayout from "../../../Layouts/BackLayout";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "@inertiajs/react";
import { LuPencil } from "react-icons/lu";
import Pagination from "../../../Components/UI/Pagination";

type ManageAnimeProps = {
  animes: App.DTOs.PaginatedAnimeData;
};

const columns: ColumnDef<App.DTOs.AnimeData>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => (
      <span className="text-text font-serif font-medium">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <span className="text-text-muted text-sm">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ getValue }) => (
      <span className="text-text-muted text-sm">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ getValue }) => (
      <span className="text-text-muted font-mono text-sm tabular-nums">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "season",
    header: "Season",
    cell: ({ getValue }) => (
      <span className="text-text-muted text-sm capitalize">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const anime = row.original;
      return (
        <Link
          href="/admin/anime"
          className="border-border bg-surface text-text-muted hover:border-primary hover:bg-primary-soft hover:text-primary inline-flex items-center justify-center rounded-md border p-1.5 transition-colors"
          title={`Edit ${anime.title}`}
        >
          <LuPencil size={14} />
        </Link>
      );
    },
  },
];

const ManageAnime = ({ animes }: ManageAnimeProps) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: animes.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: animes.last_page,
    rowCount: animes.total,
  });

  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">
            Manage Anime
          </h1>
          <p className="text-text-muted mt-0.5 text-sm">
            {animes.total} titles in library
          </p>
        </div>
      </div>

      <div className="bg-surface border-border w-full overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface-alt">
              {table.getHeaderGroups().map((hg) =>
                hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-text-muted px-4 py-3 text-left text-xs font-semibold tracking-wider whitespace-nowrap uppercase"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`hover:bg-surface-alt transition-colors ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface-alt/40"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-border border-t px-4 py-3 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-text-muted py-12 text-center text-sm"
                >
                  No anime found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="border-border bg-surface-alt/50 flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-text-muted text-center text-xs sm:text-left">
            Page {animes.current_page} of {animes.last_page}
          </span>

          <div className="flex max-w-full justify-center overflow-x-auto pb-1 sm:justify-end sm:pb-0">
            <div className="flex shrink-0 gap-1">
              <Pagination links={animes.links} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ManageAnime.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default ManageAnime;
