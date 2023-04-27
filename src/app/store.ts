import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "app/app-slice";
import { tasksReducer } from "features/TodolistsList/model/tasks/tasks-slice";
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolists-slice";
import { authReducer } from "features/auth/model/auth-reducer";


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        tasks: tasksReducer,
        todolists: todolistsReducer,
    },
});


export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;