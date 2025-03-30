import { formatTaskListItemDate } from "libs/utils"
import {
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Typography
} from "components/ui"

import { UpdateTaskForm } from "./component/update-task-form"
import { useTaskEdit } from "./hooks/use-task-edit"

const FeatureTaskEdit = () => {
  const { task, handleOpenChange, handleSubmit, isLoading } = useTaskEdit()

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange}>
      <SheetContent className='flex w-[calc(100%-3rem)] flex-col gap-8'>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>

          <SheetDescription className='[&>span]:text-muted-foreground flex items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter'>
            <Typography as='span' variant='body-2'>
              Created: {formatTaskListItemDate(task.createdAt)}
            </Typography>

            <Typography as='span' variant='body-2'>
              Updated: {formatTaskListItemDate(task.updatedAt)}
            </Typography>
          </SheetDescription>

          <Separator />
        </SheetHeader>

        <UpdateTaskForm
          defaultValues={task}
          handleOpenChange={handleOpenChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  )
}

export { FeatureTaskEdit }
