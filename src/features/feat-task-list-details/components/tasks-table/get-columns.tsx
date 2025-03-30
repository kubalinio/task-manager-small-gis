import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import type { TaskListResponse } from "api/actions/tasks/task.types"
import type { Task } from "api/types"

import { TaskStatus } from "api/actions/tasks/task.types"
import { TaskStatusIndicator } from "features/shared/components/task-status"
import { cn, formatTaskListItemDate } from "libs/utils"
import { Link } from "components/common/link"
import { Badge, Checkbox, typographyVariants } from "components/ui"

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

      <Link
        to='/task-lists/$taskListId/t/$taskId'
        params={{
          taskListId: row.original.listId,
          taskId: row.original.id
        }}
        className={typographyVariants({
          variant: "subtitle-2",
          className: "line-clamp-1 w-fit flex-1 text-sm/7 whitespace-normal"
        })}
        title={row.original.title}
      >
        {row.original.title}
      </Link>
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
    <span
      title={row.getValue("description")}
      className='text-muted-foreground line-clamp-1'
    >
      {row.getValue("description")}
    </span>
  ),
  size: 180
}

const ColumnStatus: ColumnDef<Task> = {
  id: "status",
  header: "Status",
  accessorKey: "status",
  cell: ({ row }) => (
    <div className='flex h-full items-center pr-2 xl:pr-4'>
      <Badge
        variant='filled'
        className={cn("w-full gap-1 py-1 text-sm uppercase", {
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
  size: 140,
  filterFn: statusFilterFn
}

const ColumnCreatedAt: ColumnDef<Task> = {
  id: "createdAt",
  header: "Created At",
  accessorKey: "createdAt",
  cell: ({ row }) => (
    <span className='text-muted-foreground text-xs'>
      {formatTaskListItemDate(row.original.createdAt)}
    </span>
  ),
  size: 130
}

const ColumnUpdatedAt: ColumnDef<Task> = {
  id: "updatedAt",
  header: "Updated At",
  accessorKey: "updatedAt",
  cell: ({ row }) => (
    <span className='text-muted-foreground text-xs'>
      {formatTaskListItemDate(row.original.updatedAt)}
    </span>
  ),
  size: 130
}

const getColumns = ({ data }: GetColumnsProps): ColumnDef<Task>[] => [
  ColumnSelect,
  ColumnTitle,
  ColumnDescription,
  ColumnStatus,
  ColumnCreatedAt,
  ColumnUpdatedAt,
  {
    id: "actions",
    header: () => <span className='sr-only'>Actions</span>,
    cell: ({ row }) => <RowActions data={data} item={row.original} />,
    size: 30,
    enableHiding: false
  }
]

export { getColumns }
