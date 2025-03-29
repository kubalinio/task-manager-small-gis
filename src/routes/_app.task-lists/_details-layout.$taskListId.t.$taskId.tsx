import { createFileRoute } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"

export const Route = createFileRoute(
  "/_app/task-lists/_details-layout/$taskListId/t/$taskId"
)({
  loader: ({ context: { queryClient, indexDBClient }, params: { taskId } }) => {
    return queryClient.ensureQueryData({
      ...taskQueries.getTask(taskId),
      queryFn: taskQueries.getTask(taskId).queryFn(indexDBClient!)
    })
  }
})
