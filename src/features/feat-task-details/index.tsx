import { TaskStatusButton } from "features/shared/components/task-status/task-status-button"
import { formatTaskListItemDate } from "libs/utils"
import {
  Box,
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Typography
} from "components/ui"

import { useTaskDetails } from "./hooks/use-task-details"

const FeatureTaskDetails = () => {
  const { task, handleOpenChange, handleStartEdit } = useTaskDetails()

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange}>
      <SheetContent className='flex w-[calc(100%-3rem)] flex-col gap-8'>
        <SheetHeader>
          <SheetTitle>
            <span className='text-muted-foreground text-xs'>
              {task.listTitle}
            </span>

            <br />

            {task.title}
          </SheetTitle>

          <SheetDescription className='sr-only'>
            {task.listTitle} Details
          </SheetDescription>

          <div className='flex flex-col gap-2'>
            <div className='[&>span]:text-muted-foreground flex items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter'>
              <Typography as='span' variant='subtitle-2'>
                Status:
              </Typography>

              <TaskStatusButton status={task.status} />
            </div>

            <div className='[&>span]:text-muted-foreground flex h-8 items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter'>
              <Typography as='span' variant='subtitle-2'>
                Created At:
              </Typography>

              <Typography as='span' variant='body-2'>
                {formatTaskListItemDate(task.createdAt)}
              </Typography>
            </div>

            <div className='[&>span]:text-muted-foreground flex h-8 items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter'>
              <Typography as='span' variant='subtitle-2'>
                Updated At:
              </Typography>

              <Typography as='span' variant='body-2'>
                {formatTaskListItemDate(task.updatedAt)}
              </Typography>
            </div>
          </div>

          <Separator />
        </SheetHeader>

        <Box className='flex flex-col gap-2'>
          <Typography
            as='h5'
            variant='subtitle-2'
            className='text-muted-foreground'
          >
            Description
          </Typography>

          <Box className='border-border overflow-hidden rounded-lg border p-4 text-pretty'>
            <Typography as='p' variant='body-2'>
              {task.description}
            </Typography>
          </Box>
        </Box>

        <SheetFooter className='mt-auto'>
          <Button
            variant='outline'
            onClick={() => {
              handleOpenChange(false)
            }}
          >
            Cancel
          </Button>

          <Button
            variant='default'
            onClick={() => {
              handleStartEdit()
            }}
          >
            Edit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { FeatureTaskDetails }
