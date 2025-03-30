import { createFileRoute, Outlet, useMatch } from "@tanstack/react-router"

import { FeatureTaskCreate } from "features/feat-task-create"
import { FeatureTaskDetails } from "features/feat-task-details"
import { FeatureTaskEdit } from "features/feat-task-edit"
import { FeatureTaskListEdit } from "features/feat-task-list-edit"

export const Route = createFileRoute("/_app/task-lists/_details-layout")({
  component: RouteComponent
})

function RouteComponent() {
  const isTaskListEditRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/edit",
    shouldThrow: false
  })

  const isNewTaskRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/new-task",
    shouldThrow: false
  })

  const isTaskDetailsRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/t/$taskId",
    shouldThrow: false
  })

  const isTaskEditRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/t/$taskId/edit",
    shouldThrow: false
  })

  return (
    <>
      <Outlet />

      {isTaskListEditRoute && <FeatureTaskListEdit />}

      {isNewTaskRoute && <FeatureTaskCreate />}

      {isTaskDetailsRoute && !isTaskEditRoute && <FeatureTaskDetails />}

      {isTaskEditRoute && <FeatureTaskEdit />}
    </>
  )
}
