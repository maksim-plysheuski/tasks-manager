import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api"
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer"
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../../app/store";
import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../../app/app-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    ]*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((tl: any) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            return {...state, [action.todolistId]: [action.newTask, ...state[action.todolistId]]}
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        default:
            return state;
    }
}


//actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: "REMOVE-TASK", todolistId, taskId} as const)
export const addTaskAC = (todolistId: string, newTask: TaskType) =>
    ({type: "ADD-TASK", todolistId, newTask} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: "UPDATE-TASK", model, todolistId, taskId} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todolistId, tasks} as const)


//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTasksAC(todolistId, response.data.items))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC("succeeded"))
            }
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTask(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistID, res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC("Some error"))
                }
            }
            dispatch(setAppStatusAC("idle"))
        })
        .catch((err) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC("failed"))
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        console.warn("task not found in the state")
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }

    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then((response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                dispatch(setAppErrorAC("Somme error"))
            }
            dispatch(setAppStatusAC("failed"))
        }))
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}


//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetAppStatusType
    | SetAppErrorType

