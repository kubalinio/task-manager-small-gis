import type { TaskStatusType } from "api/actions/tasks/task.types"

import { TaskStatus } from "api/actions/tasks/task.types"
import { cn } from "libs/utils"

type TaskStatusIndicatorProps = {
  status: TaskStatusType
}

const TaskStatusIndicator = ({ status }: TaskStatusIndicatorProps) => {
  return (
    <span
      className={cn(
        "ring-offset ring-offset-background mr-1 ml-2 size-3 shrink-0 rounded-full bg-transparent ring-1 ring-offset-3",
        {
          "bg-task-status-todo ring-task-status-todo":
            status === TaskStatus.TODO,
          "bg-task-status-in-progress ring-task-status-in-progress":
            status === TaskStatus.IN_PROGRESS,
          "bg-task-status-done ring-task-status-done":
            status === TaskStatus.DONE
        }
      )}
    />
  )
}

export { TaskStatusIndicator }
