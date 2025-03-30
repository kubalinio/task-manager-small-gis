import { useState, useTransition } from "react"
import { useNavigate } from "@tanstack/react-router"

import type {
  TaskListResponse,
  TaskStatusType
} from "api/actions/tasks/task.types"
import type { Task } from "api/types"

import { MoreHorizontal } from "lucide-react"

import { TaskStatus } from "api/actions/tasks/task.types"
import { useListDetails } from "features/feat-task-list-details/hooks/use-list-details"
import { Link } from "components/common/link"
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
  const { deleteTask, updateTask } = useListDetails()
  const navigate = useNavigate()

  const [isUpdatePending, startUpdateTransition] = useTransition()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleShowDetails = () => {
    navigate({
      to: "/task-lists/$taskListId/t/$taskId",
      params: { taskListId: data.id, taskId: item.id },
      replace: true
    })
  }

  const handleEditTask = () => {
    navigate({
      to: "/task-lists/$taskListId/t/$taskId/edit",
      params: { taskListId: data.id, taskId: item.id }
    })
  }

  const handleStatusChange = (newStatus: TaskStatusType) => {
    startUpdateTransition(() => {
      updateTask({
        id: item.id,
        data: {
          status: newStatus
        }
      })
    })
  }

  const handleDelete = () => {
    startUpdateTransition(() => {
      deleteTask(item.id)

      setShowDeleteDialog(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='group flex justify-end'>
            <Button
              size='icon'
              variant='ghost'
              className='text-muted-foreground/60 group-data-[state=open]:bg-accent/50 size-8 px-1.5 py-1 shadow-none'
              aria-label='Edit item'
            >
              <MoreHorizontal className='size-5' size={20} aria-hidden='true' />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-auto'>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleShowDetails}>
              Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleEditTask}>Edit</DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                handleStatusChange(TaskStatus.IN_PROGRESS)
              }}
              disabled={
                isUpdatePending || item.status === TaskStatus.IN_PROGRESS
              }
            >
              Mark as in progress
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                handleStatusChange(TaskStatus.DONE)
              }}
              disabled={isUpdatePending || item.status === TaskStatus.DONE}
            >
              Mark as done
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                handleStatusChange(TaskStatus.TODO)
              }}
              disabled={isUpdatePending || item.status === TaskStatus.TODO}
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
            <AlertDialogTitle className='text-center'>
              Are you sure?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className='mt-2'>
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
