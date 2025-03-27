import { useMemo, useRef, useState } from "react"
import {
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState
} from "@tanstack/react-table"
import type { Task } from "api/types"

import { useGetTaskList } from "libs/hooks"

import { getColumns } from "./get-columns"

const useTasksTable = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "title",
      desc: false
    }
  ])

  const { data: taskList, isLoading } = useGetTaskList(
    "b0492858-9e6e-4166-8656-e1ef941167f3"
  )

  const columns = useMemo(
    () =>
      getColumns({
        data: taskList ?? {
          id: "",
          title: "",
          createdAt: 0,
          updatedAt: 0,
          tasks: { data: [], meta: { total: 0 } }
        }
      }),
    [taskList]
  )

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows

    const updatedData = taskList?.tasks.data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    )
    table.resetRowSelection()
  }

  const table = useReactTable<Task>({
    data: taskList?.tasks.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility
    }
  })

  const statusColumn = table.getColumn("status")
  const statusFacetedValues = statusColumn?.getFacetedUniqueValues()
  const statusFilterValue = statusColumn?.getFilterValue()

  const uniqueStatusValues = useMemo(() => {
    if (!statusColumn) return []
    const values = Array.from(statusFacetedValues?.keys() ?? [])
    return values.sort()
  }, [statusColumn, statusFacetedValues])

  const statusCounts = useMemo(() => {
    if (!statusColumn) return new Map()
    return statusFacetedValues ?? new Map()
  }, [statusColumn, statusFacetedValues])

  const selectedStatuses = useMemo(() => {
    return (statusFilterValue as string[]) ?? []
  }, [statusFilterValue])

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return {
    table,
    handleDeleteRows,
    handleStatusChange,
    selectedStatuses,
    uniqueStatusValues,
    statusCounts,
    columns,
    isLoading,
    inputRef
  }
}

export { useTasksTable }
