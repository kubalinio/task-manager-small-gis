import TaskList from "features/feat-task-list-details"
import { SidebarTrigger } from "components/layouts/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Separator
} from "components/ui"

const Dashboard = () => {
  return (
    <>
      <header className='bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <TaskList />
    </>
  )
}

export default Dashboard
