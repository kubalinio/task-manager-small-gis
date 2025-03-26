import { Task } from 'api/types';
import { List } from 'api/types';
import { DBSchema, IDBPDatabase } from 'idb';

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

export type { TaskManagerDB, IndexDBClient };