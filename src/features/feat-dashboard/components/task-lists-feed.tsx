import {
  TaskListCreate,
  TaskListCreateContent,
  TaskListCreateForm,
  TaskListCreateHeader,
  TaskListCreateTrigger
} from "features/shared/components/task-list-create-dialog"
import { Box, Container } from "components/ui"

import { useTaskListsFeed } from "../hooks/use-task-lists-feed"
import {
  TaskListItem,
  TaskListItemActions,
  TaskListItemContent,
  TaskListItemFooter,
  TaskListItemHandle
} from "./task-list-item"

const TaskListsFeed = () => {
  const {
    taskLists,
    deleteTaskList,
    openDialog,
    setOpenDialog,
    onSubmit,
    isLoading
  } = useTaskListsFeed()

  return (
    <Container as='section'>
      <Box className='mb-4 flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>Task Lists</h1>

        <TaskListCreate open={openDialog} onOpenChange={setOpenDialog}>
          <TaskListCreateTrigger className='p-1.5' />

          <TaskListCreateContent>
            <TaskListCreateHeader>Create Task List</TaskListCreateHeader>

            <TaskListCreateForm onSubmit={onSubmit} isLoading={isLoading} />
          </TaskListCreateContent>
        </TaskListCreate>
      </Box>

      <Box className='grid grid-cols-1 gap-4'>
        {taskLists?.data?.map((taskList) => (
          <TaskListItem key={taskList.id}>
            <TaskListItemHandle />

            <TaskListItemContent
              id={taskList.id}
              title={taskList.title}
              tasksMeta={taskList.tasksMeta}
            />

            <TaskListItemActions
              id={taskList.id}
              deleteTaskList={deleteTaskList}
            />

            <TaskListItemFooter
              createdAt={taskList.createdAt}
              updatedAt={taskList.updatedAt}
            />
          </TaskListItem>
        ))}
      </Box>
    </Container>
  )
}

export default TaskListsFeed
