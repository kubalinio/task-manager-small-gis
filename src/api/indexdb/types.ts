import { DBSchema, IDBPDatabase } from 'idb';

interface Task {
  id: string;
  listId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: number;
  updatedAt: number;
}

interface List {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

interface TaskManagerDB extends DBSchema {
  task_lists: {
    key: string;
    value: List;
    indexes: {
      'by-created': number;
    };
  };
  tasks: {
    key: string;
    value: Task;
    indexes: {
      'by-list': string;
      'by-status': string;
      'by-created': number;
    };
  };
}

type IndexDBClient = IDBPDatabase<TaskManagerDB>;
export type { TaskManagerDB, Task, List, IndexDBClient };