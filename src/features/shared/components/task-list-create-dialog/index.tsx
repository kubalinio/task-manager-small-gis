import type { ButtonProps } from "components/ui"

import { Plus } from "lucide-react"

import { cn } from "libs/utils"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "components/ui"

import { ListCreateForm } from "./list-create-form"

type TaskListCreateProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TaskListCreate = ({
  children,
  open,
  onOpenChange,
  ...props
}: TaskListCreateProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Dialog>
  )
}

type TaskListCreateTriggerProps = {
  children?: React.ReactNode
  onClick?: () => void
} & ButtonProps

const TaskListCreateTrigger = ({
  children,
  onClick,
  className,
  ...props
}: TaskListCreateTriggerProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className={cn(
                "bg-accent hover:bg-accent/80 rounded-md p-1",
                className
              )}
              onClick={onClick}
              {...props}
            >
              {children || <Plus className='size-5' />}
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent side='right'>Create Task List</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

type TaskListCreateContentProps = {
  children: React.ReactNode
  className?: string
}

const TaskListCreateContent = ({
  children,
  className = "gap-y-8",
  ...props
}: TaskListCreateContentProps) => (
  <DialogContent className={className} {...props}>
    {children}
  </DialogContent>
)

type TaskListCreateHeaderProps = {
  children: React.ReactNode
}

const TaskListCreateHeader = ({ children }: TaskListCreateHeaderProps) => (
  <DialogHeader>
    <DialogTitle>{children}</DialogTitle>
  </DialogHeader>
)

type TaskListCreateFormProps = {
  onSubmit: (data: any) => void
  isLoading?: boolean
  isSubmitted?: boolean
  className?: string
}

const TaskListCreateForm = ({
  onSubmit,
  isLoading = false,
  isSubmitted = false,
  ...props
}: TaskListCreateFormProps) => (
  <ListCreateForm onSubmit={onSubmit} isLoading={isLoading} {...props} />
)

export {
  TaskListCreate,
  TaskListCreateTrigger,
  TaskListCreateContent,
  TaskListCreateHeader,
  TaskListCreateForm
}
