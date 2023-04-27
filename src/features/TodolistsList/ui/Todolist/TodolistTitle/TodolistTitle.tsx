import { EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import React, { FC, useCallback } from "react";
import { useActions } from "common/hooks";
import { TodolistDomain, todolistsThunks } from "features/TodolistsList/model/todolists/todolists-slice";
import s from "./style.module.scss";
import { iconStyle } from "common/style/style";

type Props = {
  todolist: TodolistDomain;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);
  const { id, title, entityStatus } = todolist;

  const removeTodolistHandler = () => removeTodolist(id);

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ title, id });
    }, [id]);

  return (
    <h3 className={s.title}>
      <EditableSpan value={title} changeTitleCallback={changeTodolistTitleHandler} />
      <IconButton sx={iconStyle} onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};