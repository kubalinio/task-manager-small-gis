import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"

import type { UpdateTaskListInput } from "api/actions/tasks/task.types"
import type { SubmitHandler } from "react-hook-form"

import { taskQueries } from "api/actions/tasks/task.queries"
import { useMutation, useSuspenseQuery } from "libs/hooks"

const useTaskListEdit = () => {
  const queryClient = useQueryClient()
  const { taskListId } = useParams({
    from: "/_app/task-lists/_details-layout/$taskListId/edit"
  })
  const navigate = useNavigate()

  const { data: taskList } = useSuspenseQuery({
    ...taskQueries.getTaskList(taskListId)
  })

  const { mutate: updateTaskList, isPending: isLoading } = useMutation(
    "updateTaskList",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: taskQueries.getTaskList(taskListId).queryKey
        })

        queryClient.invalidateQueries({
          queryKey: taskQueries.getAllTaskLists().queryKey
        })

        navigate({
          to: "/task-lists/$taskListId",
          params: { taskListId }
        })
      }
    }
  )

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: "/task-lists/$taskListId", params: { taskListId } })
    }
  }

  const handleSubmit: SubmitHandler<UpdateTaskListInput> = (data) => {
    updateTaskList({
      id: taskList.id,
      data: {
        title: data.title
      }
    })
  }

  return { taskList: taskList, handleOpenChange, handleSubmit, isLoading }
}

export { useTaskListEdit }
