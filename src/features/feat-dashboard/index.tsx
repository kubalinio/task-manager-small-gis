import { SidebarTrigger } from "components/layouts/app-sidebar"
import { Separator } from "components/ui"

import { DashboardBreadcrumb, TaskListsFeed } from "./components"

const Dashboard = () => {
  return (
    <>
      <header className='bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b p-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        <DashboardBreadcrumb />
      </header>

      <TaskListsFeed />
    </>
  )
}

export default Dashboard
