import { Table, TableBody, TableHeader } from "components/ui"

import { useTasksTable } from "../../hooks"
import { DeleteTasks, FilterSearch, FilterStatus } from "./table-actions"
import { TaskTableHead } from "./task-table-head"
import { TaskTableRow } from "./task-table-row"

const TasksTable = () => {
  const { table, columns, isLoading } = useTasksTable()

  return (
    <div className='space-y-4'>
      <div className='grid w-full grid-cols-2 items-center gap-3'>
        <div className='col-span-2 w-full lg:col-span-1 lg:w-fit'>
          <FilterSearch />
        </div>

        <div className='col-span-2 flex w-full items-center justify-between gap-3 lg:col-span-1 lg:justify-end'>
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

export { TasksTable }
