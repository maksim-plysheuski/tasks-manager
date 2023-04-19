import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Menu } from "@mui/icons-material";
import React, { useCallback, useEffect } from "react";
import { TodolistsList } from "../features/TodolistsList/components/TodolistsList/TodolistsList";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "../features/auth/components/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { selectAppStatus, selectIsInitialized } from "./app-selectors";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/auth/selectors/auth-selectors";
import { useActions } from "../common/hooks/useActions";
import { authThunks } from "../features/auth/model/auth-slice";


function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  const logoutHandler = () => logout();

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    {isLoggedIn && (
                      <Button color="inherit" onClick={logoutHandler}>
                          Log out
                      </Button>
                    )}
                </Toolbar>
                {status === "loading" && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList />} />
                    <Route path={"/login"} element={<Login />} />
                </Routes>
            </Container>
        </div>
    </BrowserRouter>
  );
}

export default App;
