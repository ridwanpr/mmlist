import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import BackLayout from "../../../Layouts/BackLayout";
import Pagination from "../../../Components/UI/Pagination";
import { Link } from "@inertiajs/react";
import { LuPencil } from "react-icons/lu";
import { edit } from "../../../actions/App/Http/Controllers/Backend/ManageUserController";

type ManageUserProps = {
  users: App.DTOs.PaginatedUserData;
};

const columns: ColumnDef<App.DTOs.UserData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="text-text font-medium">{value || "-"}</span>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="text-text font-medium">{value || "-"}</span>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="text-text font-medium">{value || "-"}</span>;
    },
  },
  {
    accessorKey: "birth_date",
    header: "Birth Date",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="text-text font-medium">{value || "-"}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link
          href={edit.url({ userId: user.id })}
          className="border-border bg-surface text-text-muted hover:border-primary hover:bg-primary-soft hover:text-primary inline-flex items-center justify-center rounded-md border p-1.5 transition-colors"
        >
          <LuPencil size={14} />
        </Link>
      );
    },
  },
];

const ManageUser = ({ users }: ManageUserProps) => {
  console.log(users);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: users.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: users.last_page,
    rowCount: users.total,
  });

  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="text-text font-serif text-2xl font-semibold">
            Manage User
          </h1>
          <p className="text-text-muted mt-0.5 text-sm">
            {users.total} users registered
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
          </tbody>
        </table>

        <div className="border-border bg-surface-alt/50 flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-text-muted text-center text-xs sm:text-left">
            Page {users.current_page} of {users.last_page}
          </span>

          <div className="flex max-w-full justify-center overflow-x-auto pb-1 sm:justify-end sm:pb-0">
            <div className="flex shrink-0 gap-1">
              <Pagination links={users.links} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ManageUser.layout = (page: React.ReactNode) => <BackLayout>{page}</BackLayout>;

export default ManageUser;
