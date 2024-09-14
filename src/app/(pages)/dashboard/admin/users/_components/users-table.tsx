"use client";

import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { CustomFilter } from "@/components/custom-table-components/custom-filter";

import { CustomTableHeader } from "@/components/custom-table-components/custom-table-header";
import { CustomTableBody } from "@/components/custom-table-components/custom-table-body";
import { DataTablePagination } from "@/components/custom-table-components/custom-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UsersTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-3">
      <div className="flex justify-end items-center pb-12">
        <CustomFilter
          table={table}
          column_id="email"
          columnName="email"
          className="rounded-full"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <CustomTableHeader table={table} />
          <CustomTableBody table={table} columns={columns} />
        </Table>
      </div>

      <DataTablePagination tableName="Users" table={table} />
    </div>
  );
}
