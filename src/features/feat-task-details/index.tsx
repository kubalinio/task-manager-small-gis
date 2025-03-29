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
      <SheetContent
        className='flex w-[calc(100%-4rem)] flex-col gap-8'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>Task Details</SheetTitle>

          <SheetDescription className='[&>p]:text-accent-foreground flex flex-col gap-2 [&>p]:text-xs'>
            <Typography as='p' variant='body-2'>
              Created at: {formatTaskListItemDate(task.createdAt)}
            </Typography>

            <Typography as='p' variant='body-2'>
              Updated at: {formatTaskListItemDate(task.updatedAt)}
            </Typography>
          </SheetDescription>

          <Separator />
        </SheetHeader>

        <Box className='flex flex-col gap-4'>
          <Typography as='h3' variant='h3'>
            {task.title}
          </Typography>

          <Typography as='p' variant='body-2'>
            {task.description}
          </Typography>

          <Typography as='p' variant='body-2'>
            Status: {task.status}
          </Typography>
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
