import type React from "react";

import BackLayout from "../../../Layouts/BackLayout";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";

type ManageAnimeProps = {
  animes: App.DTOs.PaginatedAnimeData;
};

const columns: ColumnDef<App.DTOs.AnimeData>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "season", header: "Season" },
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

  return (
    <div>
      <div className="mb-4">
        <h1>Manage Anime</h1>
      </div>
      <div className="bg-surface w-full overflow-hidden rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-surface">
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
          <tbody className="bg-surface-alt">
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
      </div>
    </div>
  );
};

ManageAnime.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default ManageAnime;
