import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app-slice";
import { tasksReducer } from "features/TodolistsList/model/tasks/tasks-slice";
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolists-slice";
import { authSlice } from "features/auth/model/auth-slice";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authSlice,
    },
});


//types
/*export type AppActionsType = TasksActionsType | TodolistActionsType
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>*/

export type AppDispatch = typeof store.dispatch;
export type AppRootStateType = ReturnType<typeof store.getState>;



//hooks
/*export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//за счет этого хука не нужно типизировать весь стейт каждый раз при вызове useSelector, вместо этого вызываем useAppSelector*/


//@ts-ignore
window.store = store