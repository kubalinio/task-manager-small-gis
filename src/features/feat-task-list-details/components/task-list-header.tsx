import { useNavigate } from "@tanstack/react-router"

import { LayoutDashboard, Plus } from "lucide-react"

import { Box, Button, Container } from "components/ui"

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
      className='mb-8 flex items-center justify-between gap-4'
    >
      <Box className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>{taskList?.title}</h1>

        <Button variant='secondary' className='px-4'>
          <LayoutDashboard className='h-4 w-4' />
          View
        </Button>
      </Box>

      <Button variant='secondary' className='px-4' onClick={handleOpenModal}>
        <Plus className='h-4 w-4' />
        Add Task
      </Button>
    </Container>
  )
}

export { TaskListHeader }
