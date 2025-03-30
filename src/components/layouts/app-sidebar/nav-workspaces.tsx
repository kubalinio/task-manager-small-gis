import { useNavigate } from "@tanstack/react-router"

import type { List } from "api/types"

import {
  TaskListCreate,
  TaskListCreateContent,
  TaskListCreateForm,
  TaskListCreateHeader,
  TaskListCreateTrigger
} from "features/shared/components/task-list-create-dialog"
import { useTaskListCreate } from "features/shared/hooks/use-task-list-create"
import { Link } from "components/common/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "components/ui/sidebar"

export function NavWorkspaces({ tasks }: { tasks: List[] }) {
  const { openDialog, setOpenDialog, onSubmit, isLoading } = useTaskListCreate()
  const { isMobile, toggleSidebar } = useSidebar()

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar()
    }
  }

  return (
    <SidebarGroup>
      {/* btn to create new task list */}
      <SidebarGroupLabel className='mb-2 flex items-center justify-between text-sm'>
        <span>Task Lists</span>

        <TaskListCreate open={openDialog} onOpenChange={setOpenDialog}>
          <TaskListCreateTrigger />

          <TaskListCreateContent>
            <TaskListCreateHeader>Create Task List</TaskListCreateHeader>

            <TaskListCreateForm onSubmit={onSubmit} isLoading={isLoading} />
          </TaskListCreateContent>
        </TaskListCreate>
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {tasks.map((list) => (
            <SidebarMenuItem
              key={list.id}
              onClick={() => {
                handleLinkClick()
              }}
            >
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
