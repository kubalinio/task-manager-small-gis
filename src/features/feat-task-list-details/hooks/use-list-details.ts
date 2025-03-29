import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"
import { TaskListDetailsContext } from "features/feat-task-list-details/store"
import { useGetTaskList, useMutation } from "libs/hooks"

const useListDetails = () => {
  const queryClient = useQueryClient()
  const store = useContext(TaskListDetailsContext)

  if (!store) {
    throw new Error("TaskListDetailsContext not found")
  }

  const { taskListId } = useParams({ from: "/_app/task-lists/$taskListId" })

  const { data: taskList } = useGetTaskList(taskListId)

  const { mutate: createTask } = useMutation("createTask", {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getAllTasks({ listId: taskListId }).queryKey
      })
    }
  })

  return {
    viewMode: store((state) => state.viewMode),
    setViewMode: store((state) => state.setViewMode),
    taskList: taskList,
    createTask: createTask
  }
}

export { useListDetails }
