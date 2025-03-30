import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/_app/task-lists/_details-layout/$taskListId/new-task"
)({
  loader: ({ params: { taskListId } }) => {
    return {
      taskListId
    }
  }
})
