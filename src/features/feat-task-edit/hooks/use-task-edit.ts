import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"

import type { CreateTaskInputForm } from "api/actions/tasks/task.types"
import type { SubmitHandler } from "react-hook-form"

import { taskQueries } from "api/actions/tasks/task.queries"
import { TaskStatus } from "api/actions/tasks/task.types"
import { useMutation, useSuspenseQuery } from "libs/hooks"

const useTaskEdit = () => {
  const queryClient = useQueryClient()
  const { taskListId, taskId } = useParams({
    from: "/_app/task-lists/_details-layout/$taskListId/t/$taskId/edit"
  })
  const navigate = useNavigate()

  const { data: task } = useSuspenseQuery({ ...taskQueries.getTask(taskId) })

  const { mutate: updateTask, isPending: isLoading } = useMutation(
    "updateTask",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: taskQueries.getTaskList(taskListId).queryKey
        })

        queryClient.invalidateQueries({
          queryKey: taskQueries.getTask(taskId).queryKey
        })

        navigate({
          to: "/task-lists/$taskListId/t/$taskId",
          params: { taskListId, taskId }
        })
      }
    }
  )

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: "/task-lists/$taskListId", params: { taskListId } })
    }
  }

  const handleSubmit: SubmitHandler<CreateTaskInputForm> = (data) => {
    updateTask({
      id: taskId,
      data: {
        title: data.title,
        description: data.description,
        status: data.status || TaskStatus.TODO
      }
    })
  }

  return { task: task.data, handleOpenChange, handleSubmit, isLoading }
}

export { useTaskEdit }
