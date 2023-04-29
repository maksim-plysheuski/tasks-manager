import Button from "@mui/material/Button";
import React, { FC } from "react";
import { useActions } from "common/hooks";
import {
  FilterValues,
  TodolistDomain,
  todolistsActions
} from "features/todolistsList/model/todolists/todolistsSlice";
import s from "./style.module.scss";
import { btnStyle } from "common/style/style";

type Props = {
  todolist: TodolistDomain
}

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeFilterHandler = (filter: FilterValues) => changeTodolistFilter({ filter, id: todolist.id });

  return (
    <div className={s.buttons}>
      <Button
        sx={btnStyle}
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("all")}>
        All
      </Button>
      <Button
        sx={btnStyle}
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("active")}>
        Active
      </Button>
      <Button
        sx={btnStyle}
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("completed")}>
        Completed
      </Button>
    </div>
  );
};