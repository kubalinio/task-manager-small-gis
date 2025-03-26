import { getDB, IndexDBClient, List, Task } from 'api/indexdb';

import { TasksFilterOptions } from './types';
import { queryFactoryOptions } from 'api/utils/query-factory-options';
import { createNotFoundError } from 'api/utils/error-handler';

const getAllTaskLists = (client: IndexDBClient) => async (_filters?: TasksFilterOptions) => {
  const db = client || await getDB();
  const lists = await db.getAll('task_lists');

  lists.sort((a: List, b: List) => b.createdAt - a.createdAt);

  return {
    data: lists,
    meta: {
      total: lists.length,
    },
  };
};

const getTaskList = (client: IndexDBClient) => async (id: string) => {
  const db = client || await getDB();
  const list = await db.get('task_lists', id);

  if (!list) {
    throw createNotFoundError('Task List', id);
  }

  return {
    data: list,
  };
};

const getAllTasks = (client: IndexDBClient) => async (filters?: TasksFilterOptions) => {
  const db = client || await getDB();
  let tasks: Task[] = [];

  // If listId is provided, get tasks by listId
  if (filters?.listId) {
    const index = db.transaction('tasks').store.index('by-list');
    tasks = await index.getAll(filters.listId);
  } else {
    // Otherwise get all tasks
    tasks = await db.getAll('tasks');
  }

  // Apply status filter if provided
  if (filters?.status) {
    tasks = tasks.filter(task => task.status === filters.status);
  }

  // Apply text search if provided
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    tasks = tasks.filter(
      task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  const sortBy = filters?.sortBy || 'createdAt';
  const sortDirection = filters?.sortDirection || 'desc';

  tasks.sort((a: Task, b: Task) => {
    return sortDirection === 'asc'
      ? a[sortBy as keyof Task] as number - (b[sortBy as keyof Task] as number)
      : (b[sortBy as keyof Task] as number) - (a[sortBy as keyof Task] as number);
  });

  return {
    data: tasks,
    meta: {
      total: tasks.length,
    },
  };
};

 const getTask = (client: IndexDBClient) => async (id: string) => {
  const db = client || await getDB();
  const task = await db.get('tasks', id);

  if (!task) {
    throw createNotFoundError('Task', id);
  }

  return {
    data: task,
  };
};

export const taskQueries = {
  all: () => ['tasks'],
  getAllTaskLists: (filters?: TasksFilterOptions) => queryFactoryOptions({
    queryKey: [...taskQueries.all(), 'lists', filters],
    queryFn: (client) => async () => getAllTaskLists(client)(filters),
  }),
  getTaskList: (id: string) => queryFactoryOptions({
    queryKey: [...taskQueries.all(), 'lists', id],
    queryFn: (client) => async () => getTaskList(client)(id),
  }),
  getAllTasks: (filters?: TasksFilterOptions) => queryFactoryOptions({
    queryKey: [...taskQueries.all(), 'all', filters],
    queryFn: (client) => async () => getAllTasks(client)(filters),
  }),
  getTask: (id: string) => queryFactoryOptions({
    queryKey: [...taskQueries.all(), 'item', id],
    queryFn: (client) => async () => getTask(client)(id),
  }),
};
