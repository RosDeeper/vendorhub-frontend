/* eslint-disable react-hooks/incompatible-library */
'use client';

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { 
  ColumnDef, 
  ColumnFiltersState, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  SortingState, 
  useReactTable
} from "@tanstack/react-table";
import { Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import { 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  UITable,
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
} from "./lib-ui";
import { Button } from "../Button";

import './styles.scss';

// CUSTOME TABLE
interface DataTableProps<TData, TValue> {
  title?: string,
  totalRecord: number,
  take?: number,
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
  isLoading?: boolean,
  tableHead?: React.ReactNode,
  onAction?: (p: number) => void;
};

const Table = <TData, TValue>({
  title,
  data,
  totalRecord,
  take = 10,
  columns,
  isLoading,
  tableHead,
  onAction,
}: DataTableProps<TData, TValue>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const page = Number(searchParams.get("page") ?? 1);
  const totalPage = Math.ceil(totalRecord / take);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: totalPage,
    
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasRows = table.getRowModel().rows.length > 0;

  const renderRows = table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} style={{ padding: '12px 16px' }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));

  const loadingView = (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-[100px] p-0"
      >
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </TableCell>
    </TableRow>
  );

  const emptyView = (
    <TableRow>
      <TableCell 
        colSpan={columns.length} 
        className="text-center py-10"
      >
        <Typography mt={2} fontStyle='italic' color="#62748e">
          No record.
          <br/>
          Please add more data.
        </Typography>
      </TableCell>
    </TableRow>
  );

  const onPageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);

    onAction?.(p);
  };
  
  return (
    <Stack gap={2}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        {title && (
          <h2 className="text-2xl font-bold text-[#584700]">
            {title}{' '}{`(${data.length})`}
          </h2>
        )}
      </Stack>

      <Stack 
        className="table-wrapper"
        gap={2}
      >
        {tableHead}

        <UITable>
          <TableHeader className="table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    className="font-bold text-[#2C3E50]"
                    style={{ padding: '0px 16px' }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading
              ? loadingView
              : hasRows
              ? renderRows
              : emptyView}
          </TableBody>
        </UITable>

        <Stack ml='auto'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button 
                  variant='ghost'
                  size='icon'
                  startIcon={<FaChevronLeft size={12} />}
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
                /> 
              </PaginationItem>

              {Array.from({ length: totalPage }).map((_, i) => {
                const p = i + 1;
                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => onPageChange(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <Button 
                  size='icon'
                  variant='ghost'
                  startIcon={<FaChevronRight size={12} />}
                  onClick={() => onPageChange(page + 1)}
                  disabled={page === totalPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Stack>
      </Stack>
      
    </Stack>
  );  
};

export { Table };
