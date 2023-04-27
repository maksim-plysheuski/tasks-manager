import React, { FC, useCallback, useEffect } from "react";
import { AddItemForm } from "common/components";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks-slice";
import { useActions } from "common/hooks";
import { TodolistDomain } from "features/TodolistsList/model/todolists/todolists-slice";
import { Task } from "features/TodolistsList/api/tasks-api";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import s from "./style.module.scss";


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


