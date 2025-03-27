import { Plus } from "lucide-react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "components/ui"

import { useTaskListCreate } from "./hooks"
import { ListCreateForm } from "./list-create-form"

const TaskListCreate = () => {
  const { onSubmit, isLoading, isSubmitted, openDialog, setOpenDialog } =
    useTaskListCreate()

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='p-1'>
          <Plus className='size-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='gap-y-8'>
        <DialogHeader>
          <DialogTitle>Create Task List</DialogTitle>
        </DialogHeader>

        <ListCreateForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          isSubmitted={isSubmitted}
        />
      </DialogContent>
    </Dialog>
  )
}

export { TaskListCreate }
