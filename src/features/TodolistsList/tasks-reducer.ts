import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api"
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer"
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../../app/store";
import {setErrorAC, SetErrorType, setStatusAC, SetStatusType} from "../../app/app-reducer";


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
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId} as const)
export const addTaskAC = (todolistId: string, newTask: TaskType) => ({type: "ADD-TASK", todolistId, newTask} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: "UPDATE-TASK", model, todolistId, taskId} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS",
    status,
    todolistId,
    taskId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE",
    title,
    todolistId,
    taskId
} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todolistId, tasks} as const)


//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.getTasks(todolistId)
        .then((response) => {
            dispatch(setTasksAC(todolistId, response.data.items))
            dispatch(setStatusAC("succeeded"))
        })
}

export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setStatusAC("succeeded"))
            }
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.createTask(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistID, res.data.data.item))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
            }
            dispatch(setStatusAC("idle"))
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
    dispatch(setStatusAC("loading"))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        let model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((response => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
                dispatch(setStatusAC("succeeded"))
            }))
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusAC("loading"))
    let task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        let model: UpdateTaskModelType = {
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status
        }
        await todolistsAPI.updateTask(todolistId, taskId, model)
        try {
            dispatch(changeTaskTitleAC(taskId, title, todolistId))
            dispatch(setStatusAC("succeeded"))
        } catch (e) {
            //some error
        }
    }
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
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetStatusType
    | SetErrorType

