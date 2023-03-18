import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import {TodolistActionsType, todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";


//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TasksActionsType | TodolistActionsType
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

//reducer, store
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))


//hooks
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//за счет этого хука не нужно типизировать весь стейт каждый раз при вызове useSelector, вместо этого вызываем useAppSelector


//@ts-ignore
window.store = store