import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

//hooks
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
//custom hook, types for useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//за счет этого хука не нужно типизировать весь стейт каждый раз при вызове useSelector, вместо этого вызываем useAppSelector
//@ts-ignore
window.store = store