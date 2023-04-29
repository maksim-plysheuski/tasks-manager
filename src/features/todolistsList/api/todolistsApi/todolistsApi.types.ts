
export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTodolist = Pick<Todolist, "id" | "title">;