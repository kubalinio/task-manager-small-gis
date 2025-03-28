import { useGetTaskLists } from "libs/hooks"

const useTaskListsFeed = () => {
  const { data: taskLists } = useGetTaskLists()

  return {
    taskLists
  }
}

export { useTaskListsFeed }
