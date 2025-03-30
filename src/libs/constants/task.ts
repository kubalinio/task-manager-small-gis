import type { TaskStatusType } from "api/actions/tasks/task.types"

import { TaskStatus } from "api/actions/tasks/task.types"

type Status = {
  value: TaskStatusType
  label: string
}

const STATUS_OPTIONS: Status[] = [
  {
    value: TaskStatus.TODO,
    label: "To Do"
  },
  {
    value: TaskStatus.IN_PROGRESS,
    label: "In Progress"
  },
  {
    value: TaskStatus.DONE,
    label: "Done"
  }
]

export { STATUS_OPTIONS }
