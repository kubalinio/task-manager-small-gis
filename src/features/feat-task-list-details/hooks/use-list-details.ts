import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"

import type {
  TaskListResponse,
  TaskStatusType
} from "api/actions/tasks/task.types"

import { taskQueries } from "api/actions/tasks/task.queries"
import { TaskListDetailsContext } from "features/feat-task-list-details/store"
import { useGetTaskList, useMutation } from "libs/hooks"

const useListDetails = () => {
  const queryClient = useQueryClient()
  const store = useContext(TaskListDetailsContext)

  if (!store) {
    throw new Error("TaskListDetailsContext not found")
  }

  const { taskListId } = useParams({
    from: "/_app/task-lists/_details-layout/$taskListId"
  })

  const { data: taskList, refetch } = useGetTaskList(taskListId)

  const { mutate: createTask } = useMutation("createTask", {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId).queryKey
      })
    }
  })

  const { mutate: updateTask } = useMutation("updateTask", {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId).queryKey
      })
    }
  })

  const { mutate: deleteTask } = useMutation("deleteTask", {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId).queryKey
      })
    }
  })

  const { mutate: deleteSelectedTasks } = useMutation("deleteSelectedTasks", {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId).queryKey
      })
    }
  })

  const handleFilterStatus = (status: TaskStatusType[]) => {
    if (status.length === 0) {
      refetch()
      return
    }

    queryClient.setQueryData(
      taskQueries.getTaskList(taskListId).queryKey,
      (old: TaskListResponse | undefined) => {
        if (!old) return old

        const originalData = queryClient.getQueryData<TaskListResponse>(
          taskQueries.getTaskList(taskListId).queryKey
        )

        if (originalData) {
          return {
            ...originalData,
            tasks: {
              ...originalData.tasks,
              data: originalData.tasks.data.filter((task) =>
                status.includes(task.status)
              )
            }
          }
        }

        return {
          ...old,
          tasks: {
            ...old.tasks,
            data: old.tasks.data.filter((task) => status.includes(task.status))
          }
        }
      }
    )
  }

  return {
    viewMode: store((state) => state.viewMode),
    setViewMode: store((state) => state.setViewMode),
    taskList,
    refetch,
    createTask,
    updateTask,
    deleteTask,
    deleteSelectedTasks,
    handleFilterStatus
  }
}

export { useListDetails }
