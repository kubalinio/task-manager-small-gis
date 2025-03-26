import type { List, Task } from "api/types"

import { v4 as uuidv4 } from "uuid"

import { getDB } from "api/indexdb"

// Demo data to seed the database
const generateSeedData = () => {
  const timestamp = Date.now()

  // Create a list
  const listId = uuidv4()
  const list: List = {
    id: listId,
    title: "My To-Do List",
    createdAt: timestamp,
    updatedAt: timestamp
  }

  // Create some tasks for the list
  const tasks: Task[] = [
    {
      id: uuidv4(),
      listId,
      title: "Complete project setup",
      description: "Initialize the project structure and install dependencies",
      status: "done",
      createdAt: timestamp - 300000, // 5 minutes ago
      updatedAt: timestamp - 120000 // 2 minutes ago
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement IndexDB storage",
      description: "Create IndexDB implementation for the task manager",
      status: "in-progress",
      createdAt: timestamp - 240000, // 4 minutes ago
      updatedAt: timestamp - 60000 // 1 minute ago
    },
    {
      id: uuidv4(),
      listId,
      title: "Create user interface",
      description:
        "Design and implement the user interface for the task manager",
      status: "todo",
      createdAt: timestamp - 180000, // 3 minutes ago
      updatedAt: timestamp - 180000 // 3 minutes ago
    }
  ]

  return { list, tasks }
}

// Check if the database is empty and seed it if needed
export const seedDatabaseIfEmpty = async (): Promise<void> => {
  const db = await getDB()

  // Check if database is empty
  const listCount = await db.count("task_lists")

  if (listCount === 0) {
    console.log("Database is empty, seeding with initial data...")
    const { list, tasks } = generateSeedData()

    // Add the list
    await db.add("task_lists", list)

    // Add the tasks
    for (const task of tasks) {
      await db.add("tasks", task)
    }

    console.log("Database seeded successfully")
  } else {
    console.log("Database already contains data, skipping seed")
  }
}
