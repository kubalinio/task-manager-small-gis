import { useListDetails } from "features/feat-task-list-details/hooks"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Container,
  Separator,
  SidebarTrigger
} from "components/ui"

import { TaskListHeader, TasksTable } from "./components"

const TaskList = () => {
  const { taskList } = useListDetails()

  return (
    <>
      <header className='bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b p-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Task Lists</BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/task-lists/${taskList?.id}`}
                className='bg-accent rounded-md px-2 py-1'
              >
                {taskList?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Container as='section'>
        <TaskListHeader />

        <TasksTable />
      </Container>
    </>
  )
}

export default TaskList
