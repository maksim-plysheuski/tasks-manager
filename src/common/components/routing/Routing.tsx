import { Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/todolistsList/ui/TodolistsList";
import { Login } from "features/auth/ui/login/Login";
import React from "react";


export const Routing = () => {
  return (
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
  );
};