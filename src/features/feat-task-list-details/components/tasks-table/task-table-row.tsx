import { flexRender } from "@tanstack/react-table"

import type { ColumnDef, Row } from "@tanstack/react-table"
import type { Task } from "api/types"

import { TableCell, TableRow } from "components/ui"

interface TaskTableRowProps {
  isLoading: boolean
  columns: ColumnDef<Task>[]
  rows?: Row<Task>[]
}

const TaskTableRow = ({ isLoading, columns, rows = [] }: TaskTableRowProps) => {
  if (isLoading) {
    return (
      <TableRow className='hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
        <TableCell colSpan={columns.length} className='h-24 text-center'>
          Loading...
        </TableCell>
      </TableRow>
    )
  }

  if (!rows.length) {
    return (
      <TableRow className='hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
        <TableCell colSpan={columns.length} className='h-24 text-center'>
          No results.
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      {rows.map((row) => (
        <TableRow
          key={row.original.id}
          data-state={row.getIsSelected() && "selected"}
          className='hover:bg-accent/50 h-px border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className='h-[inherit] last:py-0'>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export { TaskTableRow }
