/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import type { CreateTaskInputForm } from "api/actions/tasks/task.types"

import { zodResolver } from "@hookform/resolvers/zod"
import { Command } from "lucide-react"
import { useForm } from "react-hook-form"

import { CreateTaskSchemaForm } from "api/actions/tasks/task.validators"
import {
  ControlledInputField,
  ControlledTextareaField
} from "components/common/form-fields"
import { Button, Form, SheetFooter } from "components/ui"

type UpdateTaskFormProps = {
  defaultValues: CreateTaskInputForm
  onSubmit: (data: CreateTaskInputForm) => void
  handleOpenChange: (open: boolean) => void
  isLoading?: boolean
}

const UpdateTaskForm = ({
  defaultValues,
  onSubmit,
  handleOpenChange,
  isLoading = false
}: UpdateTaskFormProps) => {
  const form = useForm<CreateTaskInputForm>({
    resolver: zodResolver(CreateTaskSchemaForm),
    defaultValues
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement
    const isFormElement =
      target.tagName === "TEXTAREA" ||
      (target.tagName === "INPUT" && target.getAttribute("type") !== "submit")

    if (e.key === "Enter" && !e.metaKey && !e.ctrlKey && !isFormElement) {
      e.preventDefault()
      e.stopPropagation()
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className='flex flex-1 flex-col gap-y-8'
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
            <div className='hidden items-center gap-1 text-base font-bold md:flex'>
              <Command className='size-3' />
              <span>+</span>
              <span>↵</span>
            </div>

            <span>Update</span>
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}

export { UpdateTaskForm }
