import { Plus } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from "components/ui/sidebar"

export function NavWorkspaces({
  tasks
}: {
  tasks: {
    name: string
    emoji: React.ReactNode
    url: string
    pages: {
      name: string
      emoji: React.ReactNode
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tasks</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {tasks.map((task) => (
            <SidebarMenuItem key={task.name}>
              <SidebarMenuButton asChild>
                <a href={task.url}>
                  <span>{task.emoji}</span>

                  <span>{task.name}</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuAction showOnHover>
                <Plus />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
