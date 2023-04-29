import { instance } from "common/api";
import { BaseResponse } from "common/types";
import { Todolist, UpdateTodolist } from "features/todolistsList/api/todolistsApi/todolistsApi.types";


export const todolistsApi = {
  fetchTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title });
  },
  updateTodolist({ id, title }: UpdateTodolist) {
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  }
};