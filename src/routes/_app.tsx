import { createFileRoute, Outlet } from "@tanstack/react-router"

import { taskQueries } from "api/actions/tasks/task.queries"
import {
  AppSidebar,
  SidebarInset,
  SidebarProvider
} from "components/layouts/app-sidebar"

export const Route = createFileRoute("/_app")({
  loader: async ({ context: { queryClient, indexDBClient } }) => {
    return queryClient.ensureQueryData({
      ...taskQueries.getAllTaskLists(),
      queryFn: taskQueries.getAllTaskLists().queryFn(indexDBClient!)
    })
  },
  component: () => <AppLayout />
})

const AppLayout = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px"
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
