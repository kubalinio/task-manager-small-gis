import { SidebarTrigger } from "components/layouts/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Separator
} from "components/ui"

import TaskListsFeed from "./components/task-lists-feed"

const Dashboard = () => {
  return (
    <>
      <header className='bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                href='/'
                className='bg-accent rounded-md px-2 py-1'
              >
                Overview
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <TaskListsFeed />
    </>
  )
}

export default Dashboard
