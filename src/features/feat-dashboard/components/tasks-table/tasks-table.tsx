import { TaskTableHead } from "features/feat-dashboard/components/tasks-table/task-table-head"
import { TaskTableRow } from "features/feat-dashboard/components/tasks-table/task-table-row"
import { Table, TableBody, TableHeader } from "components/ui"

import { useTasksTable } from "./hooks"
import { DeleteTasks, FilterSearch, FilterStatus } from "./table-actions"

export default function TasksTable() {
  const { table, columns, isLoading } = useTasksTable()

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <FilterSearch />
        </div>

        <div className='flex items-center gap-3'>
          <DeleteTasks table={table} />

          <FilterStatus />
        </div>
      </div>

      <Table className='table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TaskTableHead key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </TableHeader>

        <tbody aria-hidden='true' className='table-row h-1'></tbody>

        <TableBody>
          <TaskTableRow
            columns={columns}
            rows={table.getRowModel().rows}
            isLoading={isLoading}
          />
        </TableBody>

        <tbody aria-hidden='true' className='table-row h-1'></tbody>
      </Table>
    </div>
  )
}
