import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ControlledInputField } from "components/common/form-fields"
import { Button, DialogFooter, Form } from "components/ui"

const CreateTaskListSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title is required" })
    .refine(
      (value) => {
        return value.trim() !== ""
      },
      { message: "Title is required" }
    )
})

const ListCreateForm = ({
  onSubmit,
  isLoading = false,
  isSubmitted = false
}: {
  onSubmit: (data: any) => void
  isLoading?: boolean
  isSubmitted?: boolean
}) => {
  const form = useForm({
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
          <Button
            type='submit'
            disabled={isLoading || isSubmitted}
            loading={isLoading}
          >
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export { ListCreateForm }
