import type { CreateTaskListInput } from "api/actions/tasks/task.types"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { CreateTaskListSchema } from "api/actions/tasks/task.validators"
import { ControlledInputField } from "components/common/form-fields"
import { Button, DialogFooter, Form } from "components/ui"

const ListCreateForm = ({
  onSubmit,
  isLoading = false
}: {
  onSubmit: (data: any) => void
  isLoading?: boolean
}) => {
  const form = useForm<CreateTaskListInput>({
    resolver: zodResolver(CreateTaskListSchema),
    defaultValues: {
      title: ""
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <ControlledInputField name='title' label='Title' />

        <DialogFooter>
          <Button type='submit' disabled={isLoading} loading={isLoading}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export { ListCreateForm }
