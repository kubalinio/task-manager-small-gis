/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import type { CreateTaskInputForm } from "api/actions/tasks/task.types"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { TaskStatus } from "api/actions/tasks/task.types"
import { CreateTaskSchemaForm } from "api/actions/tasks/task.validators"
import {
  ControlledInputField,
  ControlledTextareaField
} from "components/common/form-fields"
import { Button, Form, SheetFooter } from "components/ui"

type CreateTaskFormProps = {
  onSubmit: (data: CreateTaskInputForm) => void
  handleOpenChange: (open: boolean) => void
  isLoading?: boolean
}

const CreateTaskForm = ({
  onSubmit,
  handleOpenChange,
  isLoading = false
}: CreateTaskFormProps) => {
  const form = useForm<CreateTaskInputForm>({
    resolver: zodResolver(CreateTaskSchemaForm),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TODO
    }
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }
        }}
        className='flex flex-1 flex-col gap-y-4'
      >
        <ControlledInputField name='title' label='Title' />

        <ControlledTextareaField name='description' label='Description' />

        <SheetFooter className='mt-auto'>
          <Button
            variant='outline'
            onClick={() => {
              handleOpenChange(false)
            }}
          >
            Cancel
          </Button>

          <Button type='submit' disabled={isLoading} loading={isLoading}>
            Create
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}

export { CreateTaskForm }
