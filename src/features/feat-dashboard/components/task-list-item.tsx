import { useNavigate } from "@tanstack/react-router"

import type {
  TaskListsResponse,
  TaskStatusType
} from "api/actions/tasks/task.types"

import { GripHorizontal, Logs, MoreHorizontal } from "lucide-react"

import { TaskStatusIndicator } from "features/shared/components/task-status"
import { formatTaskListItemDate } from "libs/utils"
import { Link } from "components/common/link"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography
} from "components/ui"

type TaskListItemProps = TaskListsResponse["data"][number]

type TaskListItemMainProps = {
  children: React.ReactNode
}

const TaskListItem = ({ children }: TaskListItemMainProps) => {
  return (
    <Card className='shadow-0 bg-background-secondary hover:bg-background-secondary/80 relative flex flex-col items-center pb-10 transition-colors duration-300 md:flex-row'>
      {children}
    </Card>
  )
}

const TaskListItemHandle = () => {
  return (
    <CardHeader className='text-muted-foreground/60 hidden pr-6 md:block'>
      <GripHorizontal className='mt-6 size-6' />
    </CardHeader>
  )
}

const TaskListItemMetadata = ({
  tasksMeta
}: Pick<TaskListItemProps, "tasksMeta">) => {
  return (
    <Box as='ul' className='text-muted-foreground/60 flex flex-wrap gap-4'>
      {Object.keys(tasksMeta)
        .slice(1, 4)
        .map((key) => {
          const status = key as TaskStatusType

          return (
            <Box as='li' key={key} className='flex items-center gap-2'>
              <TaskStatusIndicator status={status} />
              {tasksMeta[key as keyof typeof tasksMeta]}
            </Box>
          )
        })}

      <Box as='li' className='flex items-center gap-2'>
        <Logs className='text-muted-foreground size-4' />
        {tasksMeta.total}
      </Box>
    </Box>
  )
}

const TaskListItemContent = ({
  id,
  title,
  tasksMeta
}: Pick<TaskListItemProps, "title" | "tasksMeta" | "id">) => {
  return (
    <CardContent className='border-border flex w-full flex-1 items-center justify-between border-b py-4'>
      <Box className='flex w-full flex-col gap-y-3 pr-8'>
        <Link
          to='/task-lists/$taskListId'
          params={{ taskListId: id }}
          variant='link'
          className='w-fit pl-0 text-xl'
        >
          {title}
        </Link>

        <TaskListItemMetadata tasksMeta={tasksMeta} />
      </Box>
    </CardContent>
  )
}

type TaskListItemActionsProps = {
  id: string
  deleteTaskList: (id: string) => void
}

const TaskListItemActions = ({
  id,
  deleteTaskList
}: TaskListItemActionsProps) => {
  const navigate = useNavigate()

  const handleRedirectToDetails = () => {
    navigate({
      to: "/task-lists/$taskListId",
      params: { taskListId: id }
    })
  }

  const handleRedirectToEdit = () => {
    navigate({
      to: "/task-lists/$taskListId/edit",
      params: { taskListId: id }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='absolute top-4 right-4 flex justify-end'>
          <Button
            variant='ghost'
            className='text-muted-foreground/60 p-1 shadow-none md:p-1.5'
            aria-label='Edit item'
          >
            <MoreHorizontal className='size-5' size={20} aria-hidden='true' />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-auto'>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleRedirectToDetails}>
            Details
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleRedirectToEdit}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              deleteTaskList(id)
            }}
            variant='destructive'
            className='dark:data-[variant=destructive]:focus:bg-destructive/10 cursor-pointer'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TaskListItemFooter = ({
  createdAt,
  updatedAt
}: Pick<TaskListItemProps, "createdAt" | "updatedAt">) => {
  return (
    <CardFooter className='md:ml-auto'>
      <Box className='[&>p]:text-muted-foreground/60 absolute right-5 bottom-2 flex items-center gap-x-1.5 [&>p]:text-xs [&>p]:tracking-tighter'>
        {createdAt && (
          <Typography variant='body-2'>
            Created: {formatTaskListItemDate(createdAt)}
          </Typography>
        )}

        {updatedAt && (
          <Typography variant='body-2'>
            Updated: {formatTaskListItemDate(updatedAt)}
          </Typography>
        )}
      </Box>
    </CardFooter>
  )
}

export {
  TaskListItem,
  TaskListItemHandle,
  TaskListItemContent,
  TaskListItemMetadata,
  TaskListItemActions,
  TaskListItemFooter
}
