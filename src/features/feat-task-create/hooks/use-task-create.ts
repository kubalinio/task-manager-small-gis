import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"

import type { CreateTaskInputForm } from "api/actions/tasks/task.types"
import type { SubmitHandler } from "react-hook-form"

import { taskQueries } from "api/actions/tasks/task.queries"
import { TaskStatus } from "api/actions/tasks/task.types"
import { useMutation } from "libs/hooks"

const useTaskCreate = () => {
  const queryClient = useQueryClient()
  const { taskListId } = useParams({
    from: "/_app/task-lists/_details-layout/$taskListId/new-task"
  })
  const navigate = useNavigate()

  const { mutate: createTask, isPending: isLoading } = useMutation(
    "createTask",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: taskQueries.getTaskList(taskListId).queryKey
        })

        navigate({ to: "/task-lists/$taskListId", params: { taskListId } })
      }
    }
  )

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: "/task-lists/$taskListId", params: { taskListId } })
    }
  }

  const handleSubmit: SubmitHandler<CreateTaskInputForm> = (data) => {
    createTask({
      ...data,
      listId: taskListId,
      status: data.status || TaskStatus.TODO
    })
  }

  return { handleOpenChange, handleSubmit, isLoading }
}

export { useTaskCreate }
