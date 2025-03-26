import { v4 as uuidv4 } from 'uuid';
import { IndexDBClient, getDB, Task, List } from '../../indexdb';
import {
  CreateListInput,
  CreateTaskInput,
  TaskListResponse,
  TaskResponse,
  UpdateListInput,
  UpdateTaskInput,
  createListSchema,
  createTaskSchema,
  updateListSchema,
  updateTaskSchema,
} from './task.validators';
import { createNotFoundError, createValidationError } from '../../utils/error-handler';

const createTaskList = (client: IndexDBClient) => async (data: CreateListInput): Promise<TaskListResponse> => {
  const db = client || await getDB();

  // Validate input data
  const validationResult = createListSchema.safeParse(data);

  if (!validationResult.success) {
    throw createValidationError('Invalid list data', { errors: validationResult.error.format() });
  }

  const timestamp = Date.now();
  const newList: List = {
    id: uuidv4(),
    title: data.title,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await db.add('lists', newList);

  return {
    data: newList,
  };
};

 const updateTaskList = (client: IndexDBClient) => async (id: string, data: UpdateListInput): Promise<TaskListResponse> => {
  const db = client || await getDB();

  // Check if list exists
  const existingList = await db.get('lists', id);

  if (!existingList) {
    throw createNotFoundError('List', id);
  }

  // Validate input data
  const validationResult = updateListSchema.safeParse(data);

  if (!validationResult.success) {
    throw createValidationError('Invalid list data', { errors: validationResult.error.format() });
  }

  const updatedList: List = {
    ...existingList,
    title: data.title,
    updatedAt: Date.now(),
  };

  await db.put('lists', updatedList);

  return {
    data: updatedList,
  };
};

 const deleteTaskList = (client: IndexDBClient) => async (id: string): Promise<void> => {
  const db = client || await getDB();

  // Check if list exists
  const existingList = await db.get('lists', id);

  if (!existingList) {
    throw createNotFoundError('List', id);
  }

  // Begin transaction to delete list and all its tasks
  const tx = db.transaction(['lists', 'tasks'], 'readwrite');

  // Delete all tasks with the listId
  const taskStore = tx.objectStore('tasks');
  const taskIndex = taskStore.index('by-list');
  let cursor = await taskIndex.openCursor(id);

  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  // Delete the list
  await tx.objectStore('lists').delete(id);

  // Commit the transaction
  await tx.done;
};

 const createTask = (client: IndexDBClient) => async (data: CreateTaskInput): Promise<TaskResponse> => {
  const db = client || await getDB();

  // Validate input data
  const validationResult = createTaskSchema.safeParse(data);

  if (!validationResult.success) {
    throw createValidationError('Invalid task data', { errors: validationResult.error.format() });
  }

  // Verify that list exists
  const list = await db.get('lists', data.listId);

  if (!list) {
    throw createNotFoundError('List', data.listId);
  }

  const timestamp = Date.now();
  const newTask: Task = {
    id: uuidv4(),
    listId: data.listId,
    title: data.title,
    description: data.description,
    status: data.status || 'todo',
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await db.add('tasks', newTask);

  return {
    data: newTask,
  };
};

 const updateTask = (client: IndexDBClient) => async (id: string, data: UpdateTaskInput): Promise<TaskResponse> => {
  const db = client || await getDB();

  // Check if task exists
  const existingTask = await db.get('tasks', id);

  if (!existingTask) {
    throw createNotFoundError('Task', id);
  }

  // Validate input data
  const validationResult = updateTaskSchema.safeParse(data);

  if (!validationResult.success) {
    throw createValidationError('Invalid task data', { errors: validationResult.error.format() });
  }

  const updatedTask: Task = {
    ...existingTask,
    ...data,
    updatedAt: Date.now(),
  };

  await db.put('tasks', updatedTask);

  return {
    data: updatedTask,
  };
};

 const deleteTask = (client: IndexDBClient) => async (id: string): Promise<void> => {
  const db = client || await getDB();

  // Check if task exists
  const existingTask = await db.get('tasks', id);

  if (!existingTask) {
    throw createNotFoundError('Task', id);
  }

  await db.delete('tasks', id);
};

export const taskActions = {
  createTaskList,
  updateTaskList,
  deleteTaskList,
  createTask,
  updateTask,
  deleteTask,
};
