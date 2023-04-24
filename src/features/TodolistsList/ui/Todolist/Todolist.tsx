import React, { FC, useCallback, useEffect } from "react";
import { AddItemForm } from "common/components";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks-slice";
import { useActions } from "common/hooks";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists-slice";
import { TaskType } from "features/TodolistsList/api/todolists-api";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";


type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};


export const Todolist: FC<Props> = React.memo(function({ todolist, tasks }) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = useCallback((title: string) => addTask({ title, todolistId: todolist.id }), [todolist.id]);


  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});


