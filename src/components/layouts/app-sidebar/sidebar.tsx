import * as React from "react"

import { useGetTaskLists } from "libs/hooks"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "components/ui/sidebar"

import { data } from "./data"
import { NavMain } from "./nav-main"
import { NavWorkspaces } from "./nav-workspaces"
import { ProjectLogo } from "./project-logo"
import { ThemeToggle } from "./theme-toggle"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: taskLists } = useGetTaskLists()

  return (
    <Sidebar className='border-r-0' {...props}>
      <SidebarHeader>
        <ProjectLogo />

        <NavMain items={data.navMain} />
      </SidebarHeader>

      <SidebarContent>
        <NavWorkspaces tasks={taskLists?.data ?? []} />
      </SidebarContent>

      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
