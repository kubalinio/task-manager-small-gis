import { useParams } from "@tanstack/react-router"

import { LayoutDashboard } from "lucide-react"

import { useGetTaskList } from "libs/hooks"
import { Box, Button, Container } from "components/ui"

import TasksTable from "./components/tasks-table/tasks-table"

const TaskList = () => {
  const { taskListId } = useParams({ from: "/_app/task-lists/$taskListId" })
  const { data: taskList } = useGetTaskList(taskListId)

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
