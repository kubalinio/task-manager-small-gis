import { formatTaskListItemDate } from "libs/utils"
import {
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
      <SheetContent className='flex w-[calc(100%-4rem)] flex-col gap-8'>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>

          <SheetDescription>
            <Typography as='p' variant='body-2'>
              Created at: {formatTaskListItemDate(task.createdAt)}
            </Typography>

            <Typography as='p' variant='body-2'>
              Updated at: {formatTaskListItemDate(task.updatedAt)}
            </Typography>
          </SheetDescription>
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
