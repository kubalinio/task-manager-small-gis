interface Task {
  id: string
  listId: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  createdAt: number
  updatedAt: number
}

interface List {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

export type { Task, List }
