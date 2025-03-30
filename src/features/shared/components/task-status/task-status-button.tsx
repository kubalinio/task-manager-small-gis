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
        "bg-task-status-todo": status === TaskStatus.TODO,
        "bg-task-status-in-progress": status === TaskStatus.IN_PROGRESS,
        "bg-task-status-done": status === TaskStatus.DONE
      })}
    >
      {statusToLabel[status]}
    </Button>
  )
}

export { TaskStatusButton }
