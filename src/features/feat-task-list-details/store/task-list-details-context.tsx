import { useRef } from "react"

import type { ReactNode } from "react"
import type { ViewMode } from "./task-list-details-store"

import {
  createTaskListDetailsStore,
  TaskListDetailsContext
} from "./task-list-details-store"

type TaskListDetailsContextProviderProps = {
  children: ReactNode
  defaultViewMode: ViewMode
}

const TaskListDetailsContextProvider = ({
  children,
  defaultViewMode = "table"
}: TaskListDetailsContextProviderProps) => {
  const storeRef = useRef(createTaskListDetailsStore(defaultViewMode))

  return (
    <TaskListDetailsContext.Provider value={storeRef.current}>
      {children}
    </TaskListDetailsContext.Provider>
  )
}

export { TaskListDetailsContextProvider }
