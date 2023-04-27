import { instance } from "common/api";
import { BaseResponse } from "common/types";
import { TaskPriorities, TaskStatuses } from "common/enums";


export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<FetchTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask({ title, todolistId }: AddTask) {
    return instance.post<BaseResponse<{ item: Task; }>>(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask({ taskId, todolistId, domainModel }: UpdateTask) {
    return instance.put<BaseResponse<Task>>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel);
  },
  deleteTask({ taskId, todolistId }: RemoveTask) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
  }
};

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

type FetchTasksResponse = {
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