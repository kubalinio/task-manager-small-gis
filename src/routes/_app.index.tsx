import { createFileRoute } from "@tanstack/react-router"

import { Dashboard } from "features/feat-dashboard"

export const Route = createFileRoute("/_app/")({
  component: () => <Dashboard />
})
