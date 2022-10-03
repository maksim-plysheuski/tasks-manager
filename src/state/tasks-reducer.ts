import {TasksStateType} from "../App";
import {v1} from "uuid";

type addTaskACType = ReturnType<typeof addTaskAC>

export function tasksReducer(state: TasksStateType, action: addTaskACType) {
    switch (action.type) {
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.id]: [newTask, ...state[action.id]]}
        }
        default: {
            return state
        }
    }
}


export const addTaskAC = (todolistID: string, newTitle: string) => ({type: "ADD-TASK", id: todolistID, title: newTitle} as const)


