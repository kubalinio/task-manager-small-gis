import type { List } from "api/types"

import { TaskListCreate } from "features/feat-task-list-create"
import { Link } from "components/common/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "components/ui/sidebar"

export function NavWorkspaces({ tasks }: { tasks: List[] }) {
  return (
    <SidebarGroup>
      {/* btn to create new task list */}
      <SidebarGroupLabel className='flex items-center justify-between'>
        <span>Task Lists</span>

        <TaskListCreate />
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {tasks.map((list) => (
            <SidebarMenuItem key={list.id}>
              <SidebarMenuButton asChild>
                <Link
                  to='/task-lists/$taskListId'
                  params={{ taskListId: list.id }}
                  variant='ghost'
                  className='justify-start pl-2'
                  activeProps={{
                    className: "bg-accent"
                  }}
                >
                  <span className='bg-primary size-2 shrink-0 rounded-full' />

                  <span>{list.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
