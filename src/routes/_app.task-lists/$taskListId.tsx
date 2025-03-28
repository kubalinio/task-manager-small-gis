import { createFileRoute } from "@tanstack/react-router"

import TaskList from "features/feat-task-list-details"

export const Route = createFileRoute("/_app/task-lists/$taskListId")({
  component: () => <TaskList />
})
