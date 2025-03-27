import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { taskQueries } from "api/actions/tasks/task.queries"
import { useMutation } from "libs/hooks"

const useTaskListCreate = () => {
  const queryClient = useQueryClient()
  const [openDialog, setOpenDialog] = useState(false)

  const {
    mutate: createTaskList,
    isPending: isLoading,
    isSuccess: isSubmitted
  } = useMutation("createTaskList", {
    onSuccess: async () => {
      // toast.success("Task list created successfully")

      await queryClient.invalidateQueries({
        queryKey: taskQueries.getAllTaskLists().queryKey
      })
      setOpenDialog(false)
    }
  })

  const onSubmit = (data: any) => {
    createTaskList(data)
  }

  return {
    onSubmit,
    isLoading,
    isSubmitted,
    openDialog,
    setOpenDialog
  }
}

export { useTaskListCreate }
