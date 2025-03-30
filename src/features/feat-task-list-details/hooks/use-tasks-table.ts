import { useEffect, useMemo, useRef, useState } from "react"
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
import type {
  TasksFilterOptions,
  TaskStatusType
} from "api/actions/tasks/task.types"
import type { Task } from "api/types"

import { useListDetails } from "features/feat-task-list-details/hooks/use-list-details"

import { getColumns } from "../components/tasks-table/get-columns"

const useTasksTable = () => {
  const { taskList, deleteSelectedTasks, handleQueryFilter } = useListDetails()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "status",
      desc: true
    }
  ])

  const defaultTaskList = useMemo(
    () => ({
      id: "",
      title: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: { data: [], meta: { total: 0 } },
      tasksMeta: { total: 0, todo: 0, in_progress: 0, done: 0 }
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
  const statusFilterValue = statusColumn?.getFilterValue() as string[]

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
    return statusFilterValue ?? []
  }, [statusFilterValue])

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

    handleQueryFilter({ status: newFilterValue as TaskStatusType[] })

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  const handleSearchFilter = (searchTerm: string) => {
    const filters: TasksFilterOptions = {}

    if (searchTerm) {
      filters.search = searchTerm
    }

    if (uniqueStatusValues.length > 0) {
      filters.status = uniqueStatusValues as TaskStatusType[]
    }

    handleQueryFilter(filters)

    // if (searchTerm) {
    //   table.getColumn("title")?.setFilterValue(searchTerm)
    // }

    // if (selectedStatuses.length > 0) {
    //   table.getColumn("status")?.setFilterValue(selectedStatuses)
    // }
  }

  return {
    table,
    handleDeleteRows,
    handleStatusChange,
    handleSearchFilter,
    selectedStatuses,
    uniqueStatusValues,
    statusCounts,
    columns,
    isLoading: false,
    statusMeta: taskList?.tasksMeta
  }
}

export { useTasksTable }
