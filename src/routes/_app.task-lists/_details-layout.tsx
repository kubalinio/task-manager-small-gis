import { createFileRoute, Outlet, useMatch } from "@tanstack/react-router"

import { FeatureTaskCreate } from "features/feat-task-create"
import { FeatureTaskDetails } from "features/feat-task-details"
import { FeatureTaskEdit } from "features/feat-task-edit"

export const Route = createFileRoute("/_app/task-lists/_details-layout")({
  component: RouteComponent
})

function RouteComponent() {
  const isNewTaskRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/new",
    shouldThrow: false
  })

  const isTaskDetailsRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/t/$taskId",
    shouldThrow: false,
    strict: true
  })

  const isTaskEditRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/t/$taskId/edit",
    shouldThrow: false,
    strict: true
  })

  return (
    <>
      <Outlet />

      {isNewTaskRoute && <FeatureTaskCreate />}

      {isTaskDetailsRoute && !isTaskEditRoute && <FeatureTaskDetails />}

      {isTaskEditRoute && <FeatureTaskEdit />}
    </>
  )
}
