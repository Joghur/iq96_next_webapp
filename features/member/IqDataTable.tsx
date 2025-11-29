"use client";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { checkFormData } from "@lib/formUtils";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type Row,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import CsvDownloader from "react-csv-downloader";
import { MdOutlineAdd } from "react-icons/md";
import { defaultMember, type Member, memberSchema } from "schemas/member";
import MemberForm from "./MemberForm";

export const columns: ColumnDef<Member>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
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
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Med-lem
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "nick",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					IQ-navn
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Titel
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "phones",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Telefon
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "address",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Adresse
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "tshirt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					T-Shirt
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("tshirt")}</div>
		),
	},
];

type Props = {
	data: Member[];
	onCreate: (arg1: Member) => void;
	onUpdate: (arg1: Member) => void;
	onDelete: (id: string) => void;
};

export function IqDataTable({ data, onCreate, onDelete, onUpdate }: Props) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [showDialog, setShowDialog] = useState<"table" | "user-form">("table");
	const [activeMember, setActiveMember] = useState<Member | undefined>(
		undefined);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

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

	const handleSubmit = (member: Member) => {
		if (!member) {
			return;
		}
		if (member?.id) {
			onUpdate({ ...member });
		} else {
			onCreate({ ...member });
		}
		setShowDialog("table");
		setActiveMember({ ...defaultMember });
	};

	// biome-ignore lint/suspicious/noExplicitAny: <TODO>
	const handleClickCell = (row: Row<Member>, column: any) => {
		if (column.id === "select") {
			return;
		}
		const _member = row.original;
		setActiveMember(_member);
		setShowDialog("user-form");
	};

	// Print console.error if DB data is faulty
	checkFormData<Member>(activeMember, memberSchema);

	// TODO optimize this
	return (
		<div className="w-full">
			{showDialog === "table" && (
				<>
					<div className="flex items-center py-4">
						<div className="flex gap-4">
							<CsvDownloader
								filename="dev"
								extension=".csv"
								separator=";"
								columns={table
									.getAllColumns()
									.filter(
										(column) => column.getCanHide() && column.getIsVisible(),
									)}
								datas={
									table.getFilteredSelectedRowModel().rows.length > 0
										? table.getFilteredSelectedRowModel().rows.map((row) =>
											row
												.getVisibleCells()
												.filter((cell) => cell.getValue())
												.map((cell) =>
													Array.isArray(cell.getValue())
														? (cell.getValue() as string[]).join(" ")
														: (cell.getValue() as string)
															.replace("\n", " ")
															.replace(",", ""),
												),
										)
										: table.getFilteredRowModel().rows.map((row) =>
											row
												.getVisibleCells()
												.filter((cell) => cell.getValue())
												.map((cell) =>
													Array.isArray(cell.getValue())
														? (cell.getValue() as string[]).join(" ")
														: (cell.getValue() as string)
															.replace("\n", " ")
															.replace(",", ""),
												),
										)
								}
								text="DOWNLOAD"
							>
								<Button variant="secondary">CSV</Button>
							</CsvDownloader>
							<Button variant="secondary">
								<MdOutlineAdd
									size={32}
									onClick={() => setShowDialog("user-form")}
								/>
							</Button>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" className="ml-auto">
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
					<div className="rounded-md border hover:cursor-pointer overflow-hidden">
						<Table>
							<TableHeader className="bg-secondary text-secondary-foreground">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
															header.column.columnDef.header,
															header.getContext(),
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
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell
													key={cell.id}
													onClick={() => handleClickCell(row, cell.column)}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
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
					</div>
					<div className="flex items-center justify-end space-x-2 py-4">
						<div className="flex-1 text-sm text-muted-foreground">
							{table.getFilteredSelectedRowModel().rows.length} af{" "}
							{table.getFilteredRowModel().rows.length} rækker valgt.
						</div>
					</div>
				</>
			)}
			{showDialog === "user-form" && (
				<MemberForm
					member={activeMember}
					onSubmit={handleSubmit}
					onDelete={onDelete}
					onClose={() => setShowDialog("table")}
				/>
			)}
		</div>
	);
}
