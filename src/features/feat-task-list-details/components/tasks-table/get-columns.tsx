import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import type { TaskListResponse } from "api/actions/tasks/task.types"
import type { Task } from "api/types"

import { TaskStatus } from "api/actions/tasks/task.types"
import { TaskStatusIndicator } from "features/shared/components/task-status"
import { cn } from "libs/utils"
import { Badge, Checkbox, Typography } from "components/ui"

import { RowActions } from "./table-actions"

interface GetColumnsProps {
  data: TaskListResponse
}

const statusFilterFn: FilterFn<Task> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true
  const status: string = row.getValue(columnId)
  return filterValue.includes(status)
}

const ColumnSelect: ColumnDef<Task> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(!!value)
      }}
      aria-label='Select all'
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value)
      }}
      aria-label='Select row'
    />
  ),
  size: 30,
  enableSorting: false,
  enableHiding: false
}

const ColumnTitle: ColumnDef<Task> = {
  id: "title",
  header: "Title",
  accessorKey: "title",
  cell: ({ row }) => (
    <div className='flex items-center gap-3'>
      <TaskStatusIndicator status={row.original.status} />

      <Typography as='h4' variant='subtitle-2'>
        {row.original.title}
      </Typography>
    </div>
  ),
  size: 260,
  enableHiding: false
}

const ColumnDescription: ColumnDef<Task> = {
  id: "description",
  header: "Description",
  accessorKey: "description",
  cell: ({ row }) => (
    <span className='text-muted-foreground'>{row.getValue("description")}</span>
  ),
  size: 260
}

const ColumnStatus: ColumnDef<Task> = {
  id: "status",
  header: "Status",
  accessorKey: "status",
  cell: ({ row }) => (
    <div className='flex h-full items-center px-2'>
      <Badge
        variant='filled'
        className={cn("w-full gap-1 py-1 text-base uppercase", {
          "bg-task-status-todo hover:bg-task-status-todo/80":
            row.original.status === TaskStatus.TODO,
          "bg-task-status-in-progress hover:bg-task-status-in-progress/80":
            row.original.status === TaskStatus.IN_PROGRESS,
          "bg-task-status-done hover:bg-task-status-done/80":
            row.original.status === TaskStatus.DONE
        })}
      >
        {row.original.status.replace(/-/g, " ")}
      </Badge>
    </div>
  ),
  size: 180,
  filterFn: statusFilterFn
}

const getColumns = ({ data }: GetColumnsProps): ColumnDef<Task>[] => [
  ColumnSelect,
  ColumnTitle,
  ColumnDescription,
  ColumnStatus,
  {
    id: "actions",
    header: () => <span className='sr-only'>Actions</span>,
    cell: ({ row }) => <RowActions data={data} item={row.original} />,
    size: 30,
    enableHiding: false
  }
]

export { getColumns }
