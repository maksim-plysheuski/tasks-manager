import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "app/appSlice";
import { tasksReducer } from "features/todolistsList/model/tasks/tasksSlice";
import { todolistsReducer } from "features/todolistsList/model/todolists/todolistsSlice";
import { authSlice } from "features/auth/model/authSlice";


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authSlice,
        tasks: tasksReducer,
        todolists: todolistsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;