import { getDB } from "api/indexdb"
import mockRecruitmentExtraTasks from "api/mocks/mock-recruitment-extra-tasks"
import mockRecruitmentMainTasks from "api/mocks/mock-recruitment-main-tasks"

// Check if the database is empty and seed it if needed
export const seedDatabaseIfEmpty = async (): Promise<void> => {
  const db = await getDB()

  // Check if database is empty
  const listCount = await db.count("task_lists")

  if (listCount === 0) {
    console.log("Database is empty, seeding with initial data...")
    const { list, tasks } = mockRecruitmentMainTasks()

    await db.add("task_lists", list)

    for (const task of tasks) {
      await db.add("tasks", task)
    }

    console.log("Database seeded successfully")
  } else {
    console.log("Database already contains data, skipping seed")
  }
}
