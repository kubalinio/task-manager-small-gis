"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "components/ui"
import { ChevronDown, Plus } from "lucide-react"

const ProjectSwitcher = ({
  projects
}: {
  projects: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) => {
  const [activeProject, setActiveProject] = React.useState(projects[0])

  if (!activeProject) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className='w-fit px-1.5'>
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md'>
                <activeProject.logo className='size-3' />
              </div>
              <span className='truncate font-semibold'>
                {activeProject.name}
              </span>
              <ChevronDown className='opacity-50' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-64 rounded-lg'
            align='start'
            side='bottom'
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Teams
            </DropdownMenuLabel>
            {projects.map((project, index) => (
              <DropdownMenuItem
                key={project.name}
                onClick={() => setActiveProject(project)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <project.logo className='size-4 shrink-0' />
                </div>
                {project.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export { ProjectSwitcher }
