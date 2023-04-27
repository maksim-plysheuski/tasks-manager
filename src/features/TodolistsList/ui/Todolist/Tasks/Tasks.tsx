import React, { FC } from "react";
import { TaskStatuses } from "common/enums";
import { TodolistDomain } from "features/TodolistsList/model/todolists/todolists-slice";
import s from "./style.module.scss";
import { Task } from "features/TodolistsList/api/tasks-api";
import { SingleTask } from "features/TodolistsList/ui/Todolist/Tasks/SingleTask/SingleTask";

type Props = {
  todolist: TodolistDomain;
  tasks: Task[];
};

export const Tasks: FC<Props> = ({ tasks, todolist }) => {
  let tasksForTodolist = tasks;

  switch (todolist.filter) {
    case "active": {
      tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
      break;
    }
    case "completed": {
      tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
      break;
    }
  }

  let mappedTasks = tasksForTodolist.map((t) => <SingleTask key={t.id} task={t} todolistId={todolist.id} />);

  return (
    <div className={s.tasksContainer}>
      {mappedTasks.length ? <><p>THINGS TO DO:</p>{mappedTasks}</> : false}
    </div>
  );
};