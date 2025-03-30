import type { List, Task } from "api/types"

import { v4 as uuidv4 } from "uuid"

const mockRecruitmentExtraTasks = () => {
  const timestamp = Date.now()

  const listId = uuidv4()
  const list: List = {
    id: listId,
    title: "Recruitment Extra Tasks",
    createdAt: timestamp,
    updatedAt: timestamp
  }

  const tasks: Task[] = [
    // 1. Form Validation
    {
      id: uuidv4(),
      listId,
      title: "Implement form validation",
      description: "Add validation to ensure no empty fields in the task form",
      status: "done",
      createdAt: timestamp - 180000,
      updatedAt: timestamp - 180000
    },
    {
      id: uuidv4(),
      listId,
      title: "Create validation error messages",
      description: "Add user-friendly error messages for form validation",
      status: "done",
      createdAt: timestamp - 175000,
      updatedAt: timestamp - 175000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement form submission prevention",
      description: "Block form submission when validation fails",
      status: "done",
      createdAt: timestamp - 170000,
      updatedAt: timestamp - 170000
    },

    // 2. Debounce Mechanism
    {
      id: uuidv4(),
      listId,
      title: "Implement debounce for task search",
      description: "Add debounce mechanism for search to optimize performance",
      status: "done",
      createdAt: timestamp - 165000,
      updatedAt: timestamp - 165000
    },
    {
      id: uuidv4(),
      listId,
      title: "Optimize search performance",
      description: "Fine-tune debounce timing for best user experience",
      status: "done",
      createdAt: timestamp - 160000,
      updatedAt: timestamp - 160000
    },

    // 3. Animations
    {
      id: uuidv4(),
      listId,
      title: "Add task creation animations",
      description:
        "Implement smooth animations when adding new tasks to the list",
      status: "todo",
      createdAt: timestamp - 155000,
      updatedAt: timestamp - 155000
    },
    {
      id: uuidv4(),
      listId,
      title: "Create task deletion animations",
      description: "Add transition effects when removing tasks from the list",
      status: "todo",
      createdAt: timestamp - 150000,
      updatedAt: timestamp - 150000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement status change animations",
      description: "Add visual effects when changing task status",
      status: "todo",
      createdAt: timestamp - 145000,
      updatedAt: timestamp - 145000
    },

    // 4. Unit Tests
    {
      id: uuidv4(),
      listId,
      title: "Write tests for task creation",
      description: "Create unit tests for the task creation functionality",
      status: "todo",
      createdAt: timestamp - 140000,
      updatedAt: timestamp - 140000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement tests for task editing",
      description: "Add unit tests for the task editing functionality",
      status: "todo",
      createdAt: timestamp - 135000,
      updatedAt: timestamp - 135000
    },
    {
      id: uuidv4(),
      listId,
      title: "Write tests for task filtering",
      description: "Create unit tests for search and filtering features",
      status: "in-progress",
      createdAt: timestamp - 130000,
      updatedAt: timestamp - 130000
    },

    // 5. UI Layout Switching
    {
      id: uuidv4(),
      listId,
      title: "Implement list/card view toggle",
      description:
        "Create functionality to switch between list and card views for tasks",
      status: "todo",
      createdAt: timestamp - 125000,
      updatedAt: timestamp - 125000
    },
    {
      id: uuidv4(),
      listId,
      title: "Design card view layout",
      description: "Create card layout design for task display alternative",
      status: "in-progress",
      createdAt: timestamp - 120000,
      updatedAt: timestamp - 120000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement view preference saving",
      description: "Add functionality to remember user's layout preference",
      status: "todo",
      createdAt: timestamp - 115000,
      updatedAt: timestamp - 115000
    },

    // 6. Dark Mode
    {
      id: uuidv4(),
      listId,
      title: "Create dark mode theme",
      description: "Design and implement dark color scheme for the application",
      status: "todo",
      createdAt: timestamp - 110000,
      updatedAt: timestamp - 110000
    },
    {
      id: uuidv4(),
      listId,
      title: "Implement theme toggle",
      description: "Add switch to toggle between light and dark modes",
      status: "todo",
      createdAt: timestamp - 105000,
      updatedAt: timestamp - 105000
    },
    {
      id: uuidv4(),
      listId,
      title: "Save theme preferences",
      description: "Store user's theme preference in local storage",
      status: "todo",
      createdAt: timestamp - 100000,
      updatedAt: timestamp - 100000
    }
  ]

  return { list, tasks }
}

export default mockRecruitmentExtraTasks
