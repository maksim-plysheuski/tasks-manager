import React, { FC, useCallback, useEffect } from "react";
import { AddItemForm } from "common/components";
import { tasksThunks } from "features/todolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { TodolistDomain } from "features/todolistsList/model/todolists/todolistsSlice";
import { FilterTasksButtons } from "./filterTasksButtons/FilterTasksButtons";
import { Tasks } from "./tasks/Tasks";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";
import s from "./style.module.scss";
import { Task } from "features/todolistsList/api/tasksApi/tasksApi.types";


type Props = {
  todolist: TodolistDomain;
  tasks: Task[];
};

export const Todolist: FC<Props> = React.memo(({ todolist, tasks }) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = useCallback((title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  }, [todolist.id]);

  return (
    <div className={s.todolist}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItemCallback={addTaskCallback}
                   disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      {tasks.length
        ? <FilterTasksButtons todolist={todolist} />
        : <span className={s.description}>No tasks were found</span>}
    </div>
  );
});


