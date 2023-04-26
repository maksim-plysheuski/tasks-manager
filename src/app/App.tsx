import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Menu } from "@mui/icons-material";
import React, { useCallback, useEffect } from "react";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import { CircularProgress, LinearProgress } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { selectAppStatus, selectIsInitialized } from "./app-selectors";
import { useSelector } from "react-redux";
import { authThunks } from "features/auth/model/auth-slice";
import { ErrorSnackbar } from "common/components";
import { selectIsLoggedIn } from "features/auth/model/auth-selectors";
import { useActions } from "common/hooks/useActions";
import { Login } from "features/auth/ui/login/Login";
import { AppHeader } from "common/components/AppHeader/AppHeader";


function App() {

  const isInitialized = useSelector(selectIsInitialized);


  const { initializeApp } = useActions(authThunks);



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
        <AppHeader/>
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
