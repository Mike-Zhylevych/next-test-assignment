"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection,
} from "@nextui-org/table";
import { Card } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Search, ChevronDown } from "@/app/icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { Chip } from "@nextui-org/chip";
import { DEFAULT_ROWS_PER_PAGE } from "@/constants";
import type { Transaction, Category } from "@prisma/client";

const columns = [
  { name: "DATE", uid: "createdAt", sortable: false },
  { name: "AMOUNT", uid: "amount", sortable: false },
  { name: "TYPE", uid: "type", sortable: false },
  { name: "CATEGORY", uid: "category", sortable: false },
  { name: "PAYEE", uid: "payee", sortable: false },
  { name: "NOTES", uid: "notes", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = [
  "createdAt",
  "type",
  "amount",
  "category",
  "payee",
  "notes",
];

type TransactionWithCategory = Transaction & { category: Category | null };

export default function TransactionTable() {
  const [state, setState] = useState({
    page: 1,
    limit: DEFAULT_ROWS_PER_PAGE,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionWithCategory[]>(
    []
  );
  const [totalTransactions, setTotalTransactions] = useState(0);

  const fetchData = useCallback(
    async (currentPage: number, limit: number, notes = "") => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", limit.toString());
        if (notes) {
          params.append("notes", notes);
        }
        const response = await fetch(`/api/transactions?${params.toString()}`);
        const { transactions, totalTransactions } = await response.json();
        setTransactions(transactions);
        setTotalTransactions(totalTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(state.page, state.limit, state.notes);
  }, [state.page, state.limit, state.notes]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSearchChange = useDebounce((value?: string) => {
    setState((prev) => ({ ...prev, notes: value || "", page: 1 }));
  }, 500);

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const renderCell = useCallback(
    (transaction: TransactionWithCategory, columnKey: string) => {
      switch (columnKey) {
        case "createdAt":
          if (!transaction?.createdAt) return null;
          return new Date(transaction.createdAt).toLocaleString();
        case "amount":
          if (!transaction?.amount) return null;
          const formattedNumber = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(transaction?.amount / 1000);
          return formattedNumber;
        case "type":
          if (!transaction.amount) return null;
          const type = transaction.amount > 0 ? "Income" : "Expense";
          return (
            <Chip
              className="capitalize"
              color={type === "Income" ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {type}
            </Chip>
          );
        case "category":
          if (!transaction.category) return null;
          return transaction.category.name;
        default:
          return transaction[columnKey];
      }
    },
    []
  );

  const onPaginationClick = (page: number) => {
    setState((prev) => ({ ...prev, page }));
  };
  return (
    <div className="grid grid-cols-1 max-w-screen-2xl mx-auto px-4 w-full">
      <Card className="-mt-24 w-full rounded-br-none p-5">
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by notes..."
              startContent={<Search />}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDown className="text-small" />}
                    variant="flat"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {column.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              {state.notes ? "Found" : "Total"}{" "}
              {totalTransactions.toLocaleString("en-US")} transactions
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={({ target }) =>
                  setState((prev) => ({
                    ...prev,
                    limit: Number(target.value),
                    page: 1,
                  }))
                }
                value={state.limit}
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </label>
          </div>
        </div>
        <div className="[max-height:calc(100vh-390px)] overflow-scroll">
          <Table
            isHeaderSticky
            removeWrapper
            aria-label="Transaction Table"
            selectionMode="none"
            topContentPlacement="outside"
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              loadingContent={
                <div className="backdrop-blur-md backdrop-saturate-150 bg-overlay/30 w-screen inset-0 justify-center sticky h-full rounded-lg">
                  <div className="sticky top-[50%] flex justify-center">
                    <Spinner label="Loading..." />
                  </div>
                </div>
              }
              loadingState={loading ? "loading" : "idle"}
              items={transactions}
              className="overflow-scroll"
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey as string)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <div className="flex justify-end">
        <div className="rounded-b-[14px] bt-2">
          <Pagination
            showShadow
            size="lg"
            variant="light"
            showControls
            page={state.page}
            total={Math.ceil(totalTransactions / state.limit)}
            classNames={{
              wrapper:
                "dark:bg-zinc-900 bg-white rounded-none shadow-md rounded-b-[14px]",
              prev: "rounded-tl-none",
              next: "rounded-tr-none",
            }}
            onChange={onPaginationClick}
          />
        </div>
      </div>
    </div>
  );
}
