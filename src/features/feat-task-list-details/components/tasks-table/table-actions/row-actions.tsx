import { useState, useTransition } from "react"

import type { TaskListResponse } from "api/actions/tasks/task.types"
import type { Task } from "api/types"

import { MoreHorizontal } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui"

interface RowActionsProps {
  data: TaskListResponse
  item: Task
}

const RowActions = ({ data, item }: RowActionsProps) => {
  const [isUpdatePending, startUpdateTransition] = useTransition()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleStatusChange = (newStatus: Task["status"]) => {
    startUpdateTransition(() => {
      // Update task status logic here
      console.log("Update status to:", newStatus)
    })
  }

  const handleDelete = () => {
    startUpdateTransition(() => {
      // Delete task logic here
      console.log("Delete task:", item.id)
      setShowDeleteDialog(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex justify-end'>
            <Button
              size='icon'
              variant='ghost'
              className='text-muted-foreground/60 shadow-none'
              aria-label='Edit item'
            >
              <MoreHorizontal className='size-5' size={20} aria-hidden='true' />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-auto'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                handleStatusChange("in-progress")
              }}
              disabled={isUpdatePending || item.status === "in-progress"}
            >
              Mark as in progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleStatusChange("done")
              }}
              disabled={isUpdatePending || item.status === "done"}
            >
              Mark as done
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleStatusChange("todo")
              }}
              disabled={isUpdatePending || item.status === "todo"}
            >
              Mark as todo
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setShowDeleteDialog(true)
            }}
            className='dark:data-[variant=destructive]:focus:bg-destructive/10'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isUpdatePending}
              className='bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { RowActions }
