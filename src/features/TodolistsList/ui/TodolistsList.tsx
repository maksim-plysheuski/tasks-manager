import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists-slice";
import { selectIsLoggedIn } from "features/auth/selectors/auth-selectors";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks-selectors";
import { useActions } from "common/hooks/useActions";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { selectTodolists } from "features/TodolistsList/model/todolists/todolists-selectors";


export const TodolistsList = () => {
  const { addTodolist, fetchTodolists } = useActions(todolistsThunks);
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist(title).unwrap()
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);


  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
