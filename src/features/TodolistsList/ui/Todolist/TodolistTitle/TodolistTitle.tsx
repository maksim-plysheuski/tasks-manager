import { EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import React, { FC, useCallback } from "react";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolists-slice";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const { id, title, entityStatus } = todolist;

  const removeTodolistHandler = () => removeTodolist(id);

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ title, id });
    },
    [id]
  );

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};