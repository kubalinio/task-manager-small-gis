import {
  TaskListCreate,
  TaskListCreateContent,
  TaskListCreateForm,
  TaskListCreateHeader,
  TaskListCreateTrigger
} from "features/shared/components/task-list-create-dialog"
import { useTaskListCreate } from "features/shared/hooks/use-task-list-create"
import { Box, Container } from "components/ui"

import { useTaskListsFeed } from "../hooks/use-task-lists-feed"

const TaskListsFeed = () => {
  const { openDialog, setOpenDialog, onSubmit, isLoading, isSubmitted } =
    useTaskListCreate()

  const { taskLists } = useTaskListsFeed()

  return (
    <Container as='section'>
      <Box className='mb-4 flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>Task Lists</h1>

        <TaskListCreate open={openDialog} onOpenChange={setOpenDialog}>
          <TaskListCreateTrigger className='p-1.5' />

          <TaskListCreateContent>
            <TaskListCreateHeader>Create Task List</TaskListCreateHeader>

            <TaskListCreateForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              isSubmitted={isSubmitted}
            />
          </TaskListCreateContent>
        </TaskListCreate>
      </Box>

      <Box>
        {taskLists?.data?.map((taskList) => (
          <p key={taskList.id}>{taskList.title}</p>
        ))}
      </Box>
    </Container>
  )
}

export default TaskListsFeed
