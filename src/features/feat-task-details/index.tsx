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

          <SheetDescription className='[&>p]:text-muted-foreground flex items-center justify-between gap-2 [&>p]:text-xs [&>p]:tracking-tighter'>
            <Typography as='p' variant='body-2'>
              Created: {formatTaskListItemDate(task.createdAt)}
            </Typography>

            <Typography as='p' variant='body-2'>
              Updated: {formatTaskListItemDate(task.updatedAt)}
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
