import { useListDetails } from "features/feat-task-list-details/hooks"
import { Container, Separator, SidebarTrigger } from "components/ui"

import { TaskListBreadcrumb, TaskListHeader, TasksTable } from "./components"

const TaskList = () => {
  const { taskList, viewMode } = useListDetails()

  return (
    <>
      <header className='bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b p-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        <TaskListBreadcrumb />
      </header>

      <Container as='section'>
        <TaskListHeader />

        {viewMode === "table" && <TasksTable />}
      </Container>
    </>
  )
}

export default TaskList
