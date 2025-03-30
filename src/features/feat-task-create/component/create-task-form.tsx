/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useRef } from "react"

import type { CreateTaskInputForm } from "api/actions/tasks/task.types"

import { zodResolver } from "@hookform/resolvers/zod"
import { Command } from "lucide-react"
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
  const titleInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CreateTaskInputForm>({
    resolver: zodResolver(CreateTaskSchemaForm),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TODO
    }
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

  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className='flex flex-1 flex-col gap-y-8'
      >
        <ControlledInputField name='title' label='Title' ref={titleInputRef} />

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

          <Button
            type='submit'
            disabled={isLoading}
            loading={isLoading}
            className='px-4'
          >
            <div className='hidden items-center gap-1 text-base font-bold md:flex'>
              <Command className='size-3' />
              <span>+</span>
              <span>↵</span>
            </div>

            <span>Create</span>
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}

export { CreateTaskForm }
