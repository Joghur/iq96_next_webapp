'use client';

import * as React from 'react';
import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DocumentUser } from '@lib/hooks/useFirestore';
import { Checkbox } from '@components/ui/checkbox';
import CsvDownloader from 'react-csv-downloader';
import { MdOutlineAdd } from 'react-icons/md';
import UserForm from './UserForm';

export const columns: ColumnDef<DocumentUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Med-lem
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'nick',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          IQ-navn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Titel
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phones',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Telefon
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Adresse
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'tshirt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          T-Shirt
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('tshirt')}</div>
    ),
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

const defaultUser: DocumentUser = {
  id: '',
  uid: '',
  email: '',
  avatar: '',
  isAdmin: false,
  isBoard: false,
  isSuperAdmin: false,
  name: '',
  nick: '',
  title: '',
  tshirt: undefined,
  address: undefined,
  phones: [],
  iqEmail: undefined,
  birthday: undefined,
};

type Props = {
  data: DocumentUser[];
  onCreate: (arg1: DocumentUser) => void;
  onUpdate: (arg1: DocumentUser) => void;
  onDelete: (id: string) => void;
};

export function IqDataTable({ data, onCreate, onDelete, onUpdate }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [formOverlay, setFormOverlay] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState<DocumentUser>({
    ...defaultUser,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  const handleSubmit = (userData: DocumentUser) => {
    if (!userData) {
      return;
    }
    if (userData?.id) {
      onUpdate({ ...userData });
    } else {
      onCreate({ ...userData });
    }
    setFormOverlay(false);
    setActiveUser({ ...defaultUser });
  };

  const handleClickRow = (row: Row<DocumentUser>) => {
    const user = data.filter((usr) => usr.name === row.getValue('name'))[0];
    setActiveUser(() => user);
    setFormOverlay(true);
  };

  // TODO optimize this
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-4">
          <CsvDownloader
            filename="dev"
            extension=".csv"
            separator=";"
            columns={table
              .getAllColumns()
              .filter((column) => column.getCanHide() && column.getIsVisible())}
            datas={
              table.getFilteredSelectedRowModel().rows.length > 0
                ? table.getFilteredSelectedRowModel().rows.map((row) =>
                    row
                      .getVisibleCells()
                      .filter((cell) => cell.getValue())
                      .map((cell) =>
                        Array.isArray(cell.getValue())
                          ? (cell.getValue() as string[]).join(' ')
                          : (cell.getValue() as string)
                              .replace('\n', ' ')
                              .replace(',', '')
                      )
                  )
                : table.getFilteredRowModel().rows.map((row) =>
                    row
                      .getVisibleCells()
                      .filter((cell) => cell.getValue())
                      .map((cell) =>
                        Array.isArray(cell.getValue())
                          ? (cell.getValue() as string[]).join(' ')
                          : (cell.getValue() as string)
                              .replace('\n', ' ')
                              .replace(',', '')
                      )
                  )
            }
            text="DOWNLOAD"
          >
            <Button>CSV</Button>
          </CsvDownloader>
          <Button>
            <MdOutlineAdd size={32} onClick={() => setFormOverlay(true)} />
          </Button>
          {/* <Button>
            <MdOutlineDelete size={32} onClick={onDelete} />
          </Button> */}
        </div>
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolonner <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border hover:cursor-pointer">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleClickRow(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Ingen resultater.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {formOverlay && activeUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="bg-white p-4 rounded-lg">
              <UserForm
                user={activeUser}
                onSubmit={handleSubmit}
                onDelete={onDelete}
                onCancel={() => setFormOverlay(false)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} af{' '}
          {table.getFilteredRowModel().rows.length} rækker valgt.
        </div>
      </div>
    </div>
  );
}
