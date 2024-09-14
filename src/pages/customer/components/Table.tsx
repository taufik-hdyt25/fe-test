import { IUsers } from "@/interfaces/users.interfaces";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

interface ITable {
  data: IUsers[];
}

const Table: React.FC<ITable> = ({ data }) => {
  // Definisi kolom
  const columns = useMemo<ColumnDef<IUsers>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "Name",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "birthDate",
        header: "Birth Date",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
    ],
    []
  );

  // Inisialisasi tabel
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
  });

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left border-b bg-gray-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination mt-4 flex justify-between items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-1 bg-blue-400 border border-gray-400 rounded disabled:bg-gray-300 cursor-pointer"
        >
          Previous
        </button>

        <span className="flex items-center">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-1 bg-blue-400 border border-gray-400 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="mt-4 flex items-center">
        <span>Rows per page: </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="ml-2 border border-gray-300 p-2"
        >
          {[3, 5, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
