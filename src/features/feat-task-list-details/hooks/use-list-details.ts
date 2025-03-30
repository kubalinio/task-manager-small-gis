import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"

import type { TasksFilterOptions } from "api/actions/tasks/task.types"

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

  const { data: taskList, refetchTaskList } = useGetTaskList(taskListId)

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

  const handleFilter = async (filters: TasksFilterOptions) => {
    if (!filters || Object.keys(filters).length === 0) {
      queryClient.invalidateQueries({
        queryKey: taskQueries.getTaskList(taskListId).queryKey
      })
      return
    }

    refetchTaskList(filters)
  }

  return {
    viewMode: store((state) => state.viewMode),
    setViewMode: store((state) => state.setViewMode),
    taskList,
    createTask,
    updateTask,
    deleteTask,
    deleteSelectedTasks,
    handleFilter
  }
}

export { useListDetails }
