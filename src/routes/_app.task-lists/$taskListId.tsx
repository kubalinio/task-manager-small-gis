import { createFileRoute, useMatch } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"
import { FeatureTaskCreate } from "features/feat-task-create"
import TaskList from "features/feat-task-list-details"
import { TaskListDetailsContextProvider } from "features/feat-task-list-details/store"

export const Route = createFileRoute("/_app/task-lists/$taskListId")({
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
  const isNewTaskRoute = !!useMatch({
    from: "/_app/task-lists/$taskListId/new",
    shouldThrow: false
  })

  return (
    <>
      <TaskListDetailsContextProvider defaultViewMode='table'>
        <TaskList />
      </TaskListDetailsContextProvider>

      {isNewTaskRoute && <FeatureTaskCreate />}
    </>
  )
}
