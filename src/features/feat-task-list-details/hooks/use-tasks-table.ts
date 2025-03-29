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
  Row,
  SortingState,
  VisibilityState
} from "@tanstack/react-table"
import type { TaskStatusType } from "api/actions/tasks/task.types"
import type { Task } from "api/types"

import { useListDetails } from "features/feat-task-list-details/hooks/use-list-details"

import { getColumns } from "../components/tasks-table/get-columns"

const useTasksTable = () => {
  const { taskList, deleteSelectedTasks, handleFilterStatus } = useListDetails()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "status",
      desc: true
    }
  ])

  // Default empty task list data to use when actual data is not yet available
  const defaultTaskList = useMemo(
    () => ({
      id: "",
      title: "",
      createdAt: 0,
      updatedAt: 0,
      tasks: { data: [], meta: { total: 0 } }
    }),
    []
  )

  const columns = useMemo(
    () => getColumns({ data: taskList ?? defaultTaskList }),
    [taskList, defaultTaskList]
  )

  const table = useReactTable<Task>({
    data: taskList?.tasks?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
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

    handleFilterStatus(newFilterValue as TaskStatusType[])

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  const handleDeleteRows = (selectedRows: Row<Task>[]) => {
    if (!table || !taskList?.tasks?.data) return

    taskList?.tasks.data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    )

    deleteSelectedTasks({
      listId: taskList.id,
      taskIds: selectedRows.map((row) => row.original.id)
    })

    table.resetRowSelection()
  }

  return {
    table,
    handleDeleteRows,
    handleStatusChange,
    selectedStatuses,
    uniqueStatusValues,
    statusCounts,
    columns,
    isLoading: false,
    inputRef
  }
}

export { useTasksTable }
