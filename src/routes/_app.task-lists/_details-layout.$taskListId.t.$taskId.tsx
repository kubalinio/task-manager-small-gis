import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/_app/task-lists/_details-layout/$taskListId/t/$taskId"
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello</div>
}
