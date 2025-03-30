import { getDB } from "api/indexdb"
import mockRecruitmentExtraTasks from "api/mocks/mock-recruitment-extra-tasks"
import mockRecruitmentMainTasks from "api/mocks/mock-recruitment-main-tasks"

export const seedDatabaseIfEmpty = async (): Promise<void> => {
  const db = await getDB()

  const listCount = await db.count("task_lists")

  if (listCount === 0) {
    console.log("Database is empty, seeding with initial data...")
    const { list, tasks } = mockRecruitmentMainTasks()
    const { list: list2, tasks: tasks2 } = mockRecruitmentExtraTasks()

    await db.add("task_lists", list)
    await db.add("task_lists", list2)

    for (const task of tasks) {
      await db.add("tasks", task)
    }

    for (const task of tasks2) {
      await db.add("tasks", task)
    }

    console.log("Database seeded successfully")
  } else {
    console.log("Database already contains data, skipping seed")
  }
}
