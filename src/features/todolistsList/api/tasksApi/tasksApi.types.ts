import { TaskPriorities, TaskStatuses } from "common/enums";

export type Task = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type FetchTasksResponse = {
  error: string | null;
  totalCount: number;
  items: Task[];
};

export type UpdateTaskModel = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type UpdateTask = {
  todolistId: string;
  taskId: string;
  domainModel: UpdateTaskModel;
};

export type AddTask = Pick<UpdateTask, "todolistId"> & { title: string };

export type RemoveTask = Omit<UpdateTask, "domainModel">;