import {AnyAction} from "redux";
import {TasksActionsType} from "../features/TodolistsList/tasks-reducer";
import {TodolistActionsType} from "../features/TodolistsList/todolists-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";

//reducer, store
export const store = configureStore({
    reducer: {
        app: appReducer,

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