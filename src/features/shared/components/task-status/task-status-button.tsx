import type { TaskStatusType } from "api/actions/tasks/task.types"

import { TaskStatus } from "api/actions/tasks/task.types"
import { cn } from "libs/utils"
import { statusToLabel } from "libs/utils/task"
import { Button } from "components/ui"

type TaskStatusButtonProps = {
  status: TaskStatusType
}

const TaskStatusButton = ({ status }: TaskStatusButtonProps) => {
  return (
    <Button
      size='sm'
      className={cn({
        "bg-task-status-todo hover:bg-task-status-todo/80":
          status === TaskStatus.TODO,
        "bg-task-status-in-progress hover:bg-task-status-in-progress/80":
          status === TaskStatus.IN_PROGRESS,
        "bg-task-status-done hover:bg-task-status-done/80":
          status === TaskStatus.DONE
      })}
    >
      {statusToLabel[status]}
    </Button>
  )
}

export { TaskStatusButton }
