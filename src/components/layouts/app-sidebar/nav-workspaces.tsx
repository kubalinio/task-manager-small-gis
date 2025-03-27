import type { List } from "api/types"

import { Plus } from "lucide-react"

import { Link } from "components/common/link"
import { Button } from "components/ui"
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

        <Button variant='ghost' size='sm' className='p-1'>
          <Plus className='size-4' />
        </Button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {tasks.map((task) => (
            <SidebarMenuItem key={task.title}>
              <SidebarMenuButton asChild>
                <Link
                  to='/task-lists/$taskListId'
                  params={{ taskListId: task.id }}
                  variant='ghost'
                  className='justify-start pl-2'
                  activeProps={{
                    className: "bg-accent"
                  }}
                >
                  <span className='bg-primary size-2 shrink-0 rounded-full' />

                  <span>{task.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
