import { useNavigate } from "@tanstack/react-router"

import { LayoutDashboard, Plus } from "lucide-react"

import { Box, Button, Container, Typography } from "components/ui"

import { useListDetails } from "../hooks"

const TaskListHeader = () => {
  const { taskList } = useListDetails()

  const navigate = useNavigate()

  const handleOpenModal = () => {
    navigate({
      to: "/task-lists/$taskListId/new",
      params: { taskListId: taskList?.id }
    })
  }

  return (
    <Container
      variant='without-style'
      className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row'
    >
      <Typography as='h1' variant='h5' className='shrink-0 text-left'>
        {taskList?.title}
      </Typography>

      <Box className='flex w-full flex-row items-center justify-between gap-4'>
        <Button variant='secondary' className='px-4'>
          <LayoutDashboard className='h-4 w-4' />
          View
        </Button>

        <Button variant='default' className='px-4' onClick={handleOpenModal}>
          <Plus className='h-4 w-4' />
          Add Task
        </Button>
      </Box>
    </Container>
  )
}

export { TaskListHeader }
