import { createFileRoute } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"
import TaskList from "features/feat-task-list-details"
import { TaskListDetailsContextProvider } from "features/feat-task-list-details/store"

export const Route = createFileRoute(
  "/_app/task-lists/_details-layout/$taskListId"
)({
  loader: ({
    context: { queryClient, indexDBClient },
    params: { taskListId }
  }) => {
    return queryClient.ensureQueryData({
      ...taskQueries.getTaskList(taskListId),
      queryFn: taskQueries.getTaskList(taskListId).queryFn(indexDBClient!)
    })
  },
  component: () => <RouteComponent />
})

function RouteComponent() {
  return (
    <TaskListDetailsContextProvider defaultViewMode='table'>
      <TaskList />
    </TaskListDetailsContextProvider>
  )
}
