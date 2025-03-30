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

import { UpdateTaskForm } from "./component/update-task-list-form"
import { useTaskListEdit } from "./hooks/use-task-list-edit"

const FeatureTaskListEdit = () => {
  const { taskList, handleOpenChange, handleSubmit, isLoading } =
    useTaskListEdit()

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange}>
      <SheetContent className='flex w-[calc(100%-3rem)] flex-col gap-8 overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>

          <SheetDescription className='[&>span]:text-muted-foreground flex items-center justify-between gap-2 [&>span]:text-xs [&>span]:tracking-tighter'>
            <Typography as='span' variant='body-2'>
              Created: {formatTaskListItemDate(taskList.createdAt)}
            </Typography>

            <Typography as='span' variant='body-2'>
              Updated: {formatTaskListItemDate(taskList.updatedAt)}
            </Typography>
          </SheetDescription>

          <Separator />
        </SheetHeader>

        <UpdateTaskForm
          defaultValues={taskList}
          handleOpenChange={handleOpenChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  )
}

export { FeatureTaskListEdit }
