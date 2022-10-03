import {TasksStateType} from "../App";
import {v1} from "uuid";


type actionTypes = addTaskACType | removeTaskAC | changeTaskStatusAC


type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskAC = ReturnType<typeof removeTaskAC>
type changeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>

export function tasksReducer(state: TasksStateType, action: actionTypes) {
    switch (action.type) {
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.id]: [newTask, ...state[action.id]]}
        }
        case "REMOVE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case "CHANGE-STATUS": {
            return {...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, isDone: action.isDone} : el)}
        }
        default: {
            return state
        }
    }
}


export const addTaskAC = (todolistID: string, newTitle: string) => ({type: "ADD-TASK", id: todolistID, title: newTitle} as const)

export const removeTaskAC = (todolistID: string, taskID: string) => ({type: "REMOVE-TASK",todolistID: todolistID, taskID: taskID} as const)

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({type: "CHANGE-STATUS", todolistID: todolistID, taskID: taskID, isDone: isDone} as const)


