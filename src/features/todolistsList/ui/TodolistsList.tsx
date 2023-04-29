import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Todolist } from "features/todolistsList/ui/todolist/Todolist";
import { Navigate } from "react-router-dom";
import { todolistsThunks } from "features/todolistsList/model/todolists/todolistsSlice";
import { selectIsLoggedIn } from "features/auth/model/authSelectors";
import { selectTasks } from "features/todolistsList/model/tasks/tasksSelectors";
import { useActions } from "common/hooks/useActions";
import { AddItemForm } from "common/components/addItemForm/AddItemForm";
import { selectTodolists } from "features/todolistsList/model/todolists/todolistsSelectors";
import s from "./style.module.scss";


export const TodolistsList = () => {
  const { addTodolist, fetchTodolists } = useActions(todolistsThunks);
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    fetchTodolists();
  }, []);

  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist(title).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={s.todolistPage}>
      <div className={s.pageContainer}>
        <div className={s.addNewListBlock}>
          <h4>Add new list</h4>
          <AddItemForm addItemCallback={addTodolistCallback} />
        </div>
        <div className={s.listsBlock}>
          {todolists.map((tl) => <Todolist key={tl.id} todolist={tl} tasks={tasks[tl.id]} />)}
        </div>
      </div>
    </div>
  );
};
