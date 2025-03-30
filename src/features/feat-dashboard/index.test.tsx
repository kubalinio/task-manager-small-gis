import { act, render, screen, waitFor } from "tests"
import { Mock, vi } from "vitest"

import Dashboard from "features/feat-dashboard"

// Mock the task-lists-feed hook
vi.mock("./hooks/use-task-lists-feed", () => ({
  useTaskListsFeed: () => ({
    taskLists: {
      data: [
        {
          id: "1",
          title: "Test Task List",
          tasksMeta: { totalTasks: 2, completedTasks: 1 },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    },
    deleteTaskList: vi.fn(),
    openDialog: false,
    setOpenDialog: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false
  })
}))

describe("App Dashboard View", () => {
  it("should render", async () => {
    await act(async () => {
      render(<Dashboard />)
    })
  })

  it("should render the dashboard", async () => {
    await act(async () => {
      render(<Dashboard />)
    })

    await waitFor(() => {
      expect(screen.getByText("Task Lists")).toBeInTheDocument()
    })

    // Check if the mocked task list is rendered
    expect(screen.getByText("Test Task List")).toBeInTheDocument()
  })
})
