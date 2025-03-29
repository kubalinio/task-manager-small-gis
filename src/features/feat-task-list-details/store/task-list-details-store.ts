import { createContext } from "react"

import { create } from "zustand"

type ViewMode = "table" | "cards"

interface TaskListDetailsState {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const createTaskListDetailsStore = (defaultViewMode: ViewMode) =>
  create<TaskListDetailsState>((set) => ({
    viewMode: defaultViewMode,
    setViewMode: (mode: ViewMode) => {
      set({ viewMode: mode })
    }
  }))

const TaskListDetailsContext = createContext<
  ReturnType<typeof createTaskListDetailsStore> | undefined
>(undefined)

export type { TaskListDetailsState, ViewMode }
export { createTaskListDetailsStore, TaskListDetailsContext }
