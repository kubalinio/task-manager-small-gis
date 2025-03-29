import { createFileRoute, useMatch } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/task-lists/$taskListId/new")({
  component: () => <div>empty</div>,
  loader: ({ params: { taskListId } }) => {
    return {
      taskListId
    }
  }
})
