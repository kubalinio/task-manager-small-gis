import { IndexDBClient } from 'api/indexdb';
import {taskActions} from './task.actions';
import { CreateListInput, CreateTaskInput, UpdateListInput, UpdateTaskInput } from './task.validators';

export const taskMutations = {
  createTaskList: (client: IndexDBClient) => ( data: CreateListInput) => {
    return taskActions.createTaskList(client)(data);
  },

  updateTaskList: (client: IndexDBClient) => (params: { id: string; data: UpdateListInput }) => {
    return taskActions.updateTaskList(client)(params.id, params.data);
  },

  deleteTaskList: (client: IndexDBClient) => (id: string) => {
    return taskActions.deleteTaskList(client)(id);
  },
  createTask: (client: IndexDBClient) => (data: CreateTaskInput) => {
    return taskActions.createTask(client)(data);
  },

  updateTask: (client: IndexDBClient) => (params: { id: string; data: UpdateTaskInput }) => {
    return taskActions.updateTask(client)(params.id, params.data);
  },

  deleteTask: (client: IndexDBClient) => (id: string) => {
    return taskActions.deleteTask(client)(id);
  }
};

export type UpdateTaskParams = { id: string; data: UpdateTaskInput };
