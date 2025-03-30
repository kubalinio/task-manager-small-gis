import { createFileRoute } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"

export const Route = createFileRoute(
  "/_app/task-lists/_details-layout/$taskListId/edit"
)({
  loader: ({
    context: { queryClient, indexDBClient },
    params: { taskListId }
  }) => {
    return queryClient.ensureQueryData({
      ...taskQueries.getTaskList(taskListId),
      queryFn: taskQueries.getTaskList(taskListId).queryFn(indexDBClient!)
    })
  }
})
