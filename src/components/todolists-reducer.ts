import {TodoListsType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}


export const todolistReducer = (state: Array<TodoListsType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)
        case "ADD-TODOLIST":
            let newTodolist = {id: v1(), title: action.title, filter: "all"}
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            throw new Error("I don't understand this type")
    }
}


type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodolistActionACType = ReturnType<typeof addTodolistActionAC>
type changeTodolistNameACType = ReturnType<typeof changeTodolistNameAC>

export const removeTodoListAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1
        }
    } as const
}

export const addTodolistActionAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: newTitle
        }
    } as const
}

export const changeTodolistNameAC = (newID: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: newID,
            title: newTitle
        }
    } as const
}








