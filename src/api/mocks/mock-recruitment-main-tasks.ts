import type { List, Task } from "api/types"

import { v4 as uuidv4 } from "uuid"

const mockRecruitmentMainTasks = () => {
  const timestamp = Date.now()

  const listId = uuidv4()
  const list: List = {
    id: listId,
    title: "Recruitment Main Tasks",
    createdAt: timestamp,
    updatedAt: timestamp
  }

  const tasks: Task[] = [
    // 1. Task Registry
    {
      id: uuidv4(),
      listId,
      title: "Task Registry Implementation",
      description: "Create the main task registry component",
      status: "done",
      createdAt: timestamp - 180000,
      updatedAt: timestamp - 180000
    },
    {
      id: uuidv4(),
      listId,
      title: "Design task card component",
      description:
        "Create a task card displaying title, description, and status",
      status: "done",
      createdAt: timestamp - 175000,
      updatedAt: timestamp - 175000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement status indicators",
      description:
        "Add visual indicators for tasks with different statuses (To Do, In Progress, Done)",
      status: "done",
      createdAt: timestamp - 170000,
      updatedAt: timestamp - 170000
    },
    {
      id: uuidv4(),
      listId,
      title: "Build task completion feature",
      description:
        "Create functionality to mark tasks as complete, with appropriate status change and visual feedback",
      status: "done",
      createdAt: timestamp - 165000,
      updatedAt: timestamp - 165000
    },

    // 2. Task Add/Edit
    {
      id: uuidv4(),
      listId,
      title: "Create new task form",
      description:
        "Design and implement form for adding new tasks with fields for title, description, and status",
      status: "done",
      createdAt: timestamp - 160000,
      updatedAt: timestamp - 160000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement form validation",
      description: "Add validation to ensure proper data entry for task fields",
      status: "done",
      createdAt: timestamp - 155000,
      updatedAt: timestamp - 155000
    },
    {
      id: uuidv4(),
      listId,
      title: "Build task edit functionality",
      description:
        "Create edit button and reuse form component for editing existing tasks",
      status: "done",
      createdAt: timestamp - 150000,
      updatedAt: timestamp - 150000
    },
    {
      id: uuidv4(),
      listId,
      title: "Add cancel and save actions",
      description:
        "Implement cancel and save actions for the task form with appropriate error handling",
      status: "done",
      createdAt: timestamp - 145000,
      updatedAt: timestamp - 145000
    },

    // 3. Filtering and Sorting
    {
      id: uuidv4(),
      listId,
      title: "Implement search functionality",
      description:
        "Create search input to filter tasks by title and description text",
      status: "done",
      createdAt: timestamp - 140000,
      updatedAt: timestamp - 140000
    },
    {
      id: uuidv4(),
      listId,
      title: "Add search debounce mechanism",
      description: "Implement debounce for search to optimize performance",
      status: "done",
      createdAt: timestamp - 135000,
      updatedAt: timestamp - 135000
    },
    {
      id: uuidv4(),
      listId,
      title: "Create status filter",
      description:
        "Add dropdown or toggle buttons to filter tasks by status (To Do, In Progress, Done)",
      status: "done",
      createdAt: timestamp - 130000,
      updatedAt: timestamp - 130000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement date sorting",
      description:
        "Add controls to sort tasks by creation date in ascending or descending order",
      status: "done",
      createdAt: timestamp - 125000,
      updatedAt: timestamp - 125000
    },

    // 4. Task Deletion
    {
      id: uuidv4(),
      listId,
      title: "Add delete functionality",
      description:
        "Implement delete button on task cards with appropriate action",
      status: "done",
      createdAt: timestamp - 120000,
      updatedAt: timestamp - 120000
    },
    {
      id: uuidv4(),
      listId,
      title: "Create confirmation dialog",
      description:
        "Add confirmation dialog before deleting tasks to prevent accidental deletion",
      status: "done",
      createdAt: timestamp - 115000,
      updatedAt: timestamp - 115000
    },

    // 5. Responsiveness
    {
      id: uuidv4(),
      listId,
      title: "Design mobile layout",
      description:
        "Create responsive layout for mobile devices with appropriate styling",
      status: "done",
      createdAt: timestamp - 105000,
      updatedAt: timestamp - 105000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement desktop layout",
      description:
        "Optimize layout for desktop with appropriate spacing and component sizing",
      status: "done",
      createdAt: timestamp - 100000,
      updatedAt: timestamp - 100000
    },
    {
      id: uuidv4(),
      listId,
      title: "Add responsive breakpoints",
      description:
        "Implement media queries to handle various screen sizes and orientations",
      status: "done",
      createdAt: timestamp - 95000,
      updatedAt: timestamp - 95000
    },
    {
      id: uuidv4(),
      listId,
      title: "Test cross-device compatibility",
      description:
        "Ensure UI works correctly across different devices and screen sizes",
      status: "in-progress",
      createdAt: timestamp - 90000,
      updatedAt: timestamp - 90000
    }
  ]

  return { list, tasks }
}

export default mockRecruitmentMainTasks
