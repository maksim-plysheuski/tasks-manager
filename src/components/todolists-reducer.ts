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
        default:
            throw new Error("I don't understand this type")
    }
}



