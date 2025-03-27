import { LayoutDashboard } from "lucide-react"

import { useGetTaskList } from "libs/hooks"
import { Box, Button, Container } from "components/ui"

import TasksTable from "./components/tasks-table/tasks-table"

const TaskList = () => {
  const { data: taskList } = useGetTaskList(
    "b0492858-9e6e-4166-8656-e1ef941167f3"
  )

  return (
    <Container as='section'>
      <Box className='mb-4 flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>{taskList?.title}</h1>

        <Button variant='secondary' className='px-4'>
          <LayoutDashboard className='h-4 w-4' />
          View
        </Button>
      </Box>

      <TasksTable />
    </Container>
  )
}

export default TaskList
