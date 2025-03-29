import { useNavigate, useParams } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"
import { useSuspenseQuery } from "libs/hooks"

const useTaskDetails = () => {
  const { taskListId, taskId } = useParams({
    from: "/_app/task-lists/_details-layout/$taskListId/t/$taskId"
  })
  const navigate = useNavigate()

  const { data: task } = useSuspenseQuery({ ...taskQueries.getTask(taskId) })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: "/task-lists/$taskListId", params: { taskListId } })
    }
  }

  const handleStartEdit = () => {
    navigate({ to: "/task-lists/$taskListId/new", params: { taskListId } })
  }

  return { task: task.data, handleOpenChange, handleStartEdit }
}

export { useTaskDetails }
