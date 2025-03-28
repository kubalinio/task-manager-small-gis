import { useQueryClient } from "@tanstack/react-query"

import { taskQueries } from "api/actions/tasks/task.queries"
import { useTaskListCreate } from "features/shared/hooks/use-task-list-create"
import { useGetTaskLists, useMutation } from "libs/hooks"

const useTaskListsFeed = () => {
  const queryClient = useQueryClient()

  const { data: taskLists } = useGetTaskLists()

  const { openDialog, setOpenDialog, onSubmit, isLoading } = useTaskListCreate()

  const { mutate: deleteTaskList } = useMutation("deleteTaskList", {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: taskQueries.getAllTaskLists().queryKey
      })
    }
  })

  return {
    taskLists,
    deleteTaskList,
    openDialog,
    setOpenDialog,
    onSubmit,
    isLoading
  }
}

export { useTaskListsFeed }
