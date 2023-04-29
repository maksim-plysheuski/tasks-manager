import { instance } from "common/api";
import { BaseResponse } from "common/types";
import {
  AddTask,
  FetchTasksResponse,
  RemoveTask,
  Task,
  UpdateTask
} from "features/todolistsList/api/tasksApi/tasksApi.types";


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