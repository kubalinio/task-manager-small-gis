import { CreateTaskForm } from "features/feat-task-create/component/create-task-form"
import {
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "components/ui"

import { useTaskCreate } from "./hooks/use-task-create"

const FeatureTaskCreate = () => {
  const { handleOpenChange, handleSubmit, isLoading } = useTaskCreate()

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange}>
      <SheetContent className='flex w-[calc(100%-3rem)] flex-col gap-8'>
        <SheetHeader>
          <SheetTitle>Create Task</SheetTitle>

          <SheetDescription>
            Create a new task to help you manage your time and get things done.
          </SheetDescription>

          <Separator />
        </SheetHeader>

        <CreateTaskForm
          handleOpenChange={handleOpenChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  )
}

export { FeatureTaskCreate }
