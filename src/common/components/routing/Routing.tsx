import { Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/todolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/login/Login";
import React, { useEffect } from "react";
import { AppPreloader } from "common/components/appPreloader/AppPreloader";
import { useSelector } from "react-redux";
import { selectIsAppInitialized } from "app/appSelectors";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/authSlice";


export const Routing = () => {
  const isAppInitialized = useSelector(selectIsAppInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isAppInitialized) {
    return <AppPreloader />;
  }

  return (
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
  );
};