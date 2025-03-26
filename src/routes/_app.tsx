import { createFileRoute, Outlet } from "@tanstack/react-router"

import {
  AppSidebar,
  SidebarInset,
  SidebarProvider
} from "components/layouts/app-sidebar"

export const Route = createFileRoute("/_app")({
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
