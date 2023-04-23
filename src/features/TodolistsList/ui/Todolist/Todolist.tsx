import React, { FC, useCallback, useEffect } from "react";
import { AddItemForm } from "common/components";
import { EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { tasksThunks } from "features/TodolistsList/model/tasks-slice";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists-slice";
import { TaskType } from "features/TodolistsList/api/todolists-api";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";


type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};


export const Todolist: FC<Props> = React.memo(function({ todolist, tasks }) {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const { fetchTasks, addTask } = useActions(tasksThunks);


  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = useCallback((title: string) => addTask({ title, todolistId: todolist.id }), [todolist.id]);

  const removeTodolistHandler = () => removeTodolist(todolist.id);

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ title, id: todolist.id });
    },
    [todolist.id]
  );


  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});


