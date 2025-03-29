import type { Table } from "@tanstack/react-table"
import type { Task } from "api/types"

import { Trash, TriangleAlert, X } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from "components/ui"

import { useTasksTable } from "../../../hooks"

interface DeleteTasksProps {
  table: Table<Task>
}

const DeleteTasks = ({ table }: DeleteTasksProps) => {
  const { handleDeleteRows } = useTasksTable()

  if (table.getSelectedRowModel().rows.length === 0) return null

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='lg:ml-auto' variant='outline'>
          <Trash className='-ms-1 opacity-60' size={16} aria-hidden='true' />
          Delete
          <span className='border-border bg-background text-muted-foreground/70 ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium'>
            {table.getSelectedRowModel().rows.length}
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <div className='flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4'>
          <div
            className='border-border flex size-9 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <TriangleAlert className='opacity-80' size={16} />
          </div>

          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {table.getSelectedRowModel().rows.length} selected{" "}
              {table.getSelectedRowModel().rows.length === 1 ? "row" : "rows"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              handleDeleteRows(table.getSelectedRowModel().rows)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteTasks }
