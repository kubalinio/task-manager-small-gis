import { flexRender } from "@tanstack/react-table"

import type { HeaderGroup } from "@tanstack/react-table"
import type { Task } from "api/types"

import { ArrowDownToLine, ArrowUpToLine } from "lucide-react"

import { cn } from "libs/utils"
import { TableHead, TableRow } from "components/ui"

type TaskTableHeadProps = {
  headerGroup: HeaderGroup<Task>
}

const TaskTableHead = ({ headerGroup }: TaskTableHeadProps) => {
  return (
    <TableRow key={headerGroup.id} className='hover:bg-transparent'>
      {headerGroup.headers.map((header) => {
        return (
          <TableHead
            key={header.id}
            style={{ width: `${header.getSize()}px` }}
            className='bg-background-secondary border-border relative h-9 border-y select-none first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r'
          >
            {header.isPlaceholder ? null : header.column.getCanSort() ? (
              <button
                type='button'
                className={cn(
                  header.column.getCanSort() &&
                    "flex h-full cursor-pointer items-center gap-2 select-none"
                )}
                onClick={header.column.getToggleSortingHandler()}
                onKeyDown={(e) => {
                  // Enhanced keyboard handling for sorting
                  if (
                    header.column.getCanSort() &&
                    (e.key === "Enter" || e.key === " ")
                  ) {
                    e.preventDefault()
                    header.column.getToggleSortingHandler()?.(e)
                  }
                }}
                tabIndex={header.column.getCanSort() ? 0 : undefined}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: (
                    <ArrowUpToLine
                      className='shrink-0 opacity-60'
                      size={16}
                      aria-hidden='true'
                    />
                  ),
                  desc: (
                    <ArrowDownToLine
                      className='shrink-0 opacity-60'
                      size={16}
                      aria-hidden='true'
                    />
                  )
                }[header.column.getIsSorted() as string] ?? null}
              </button>
            ) : (
              flexRender(header.column.columnDef.header, header.getContext())
            )}
          </TableHead>
        )
      })}
    </TableRow>
  )
}

export { TaskTableHead }
