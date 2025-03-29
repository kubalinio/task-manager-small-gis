import { createFileRoute, Outlet, useMatch } from "@tanstack/react-router"

import { FeatureTaskCreate } from "features/feat-task-create"

export const Route = createFileRoute("/_app/task-lists/_details-layout")({
  component: RouteComponent
})

function RouteComponent() {
  const isNewTaskRoute = !!useMatch({
    from: "/_app/task-lists/_details-layout/$taskListId/new",
    shouldThrow: false
  })

  return (
    <>
      <Outlet />

      {isNewTaskRoute && <FeatureTaskCreate />}
    </>
  )
}
