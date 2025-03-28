import * as React from "react"

import { useGetTaskLists } from "libs/hooks"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "components/ui/sidebar"

import { data } from "./data"
import { NavMain } from "./nav-main"
import { NavWorkspaces } from "./nav-workspaces"
import { ProjectSwitcher } from "./project-switcher"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: taskLists } = useGetTaskLists()

  // console.log(taskLists)

  return (
    <Sidebar className='border-r-0' {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />

        <NavMain items={data.navMain} />
      </SidebarHeader>

      <SidebarContent>
        <NavWorkspaces tasks={taskLists?.data ?? []} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
