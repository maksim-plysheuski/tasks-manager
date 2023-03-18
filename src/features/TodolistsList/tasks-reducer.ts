import {TasksStateType} from "../../app/App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api"
import {SetTodolistsActionType} from "./todolists-reducer"
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../../app/store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK",
    todolistId: string,
    newTask: TaskType
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistId: string
    taskId: string
    title: string
}

type setTasksACType = ReturnType<typeof setTasksAC>

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | setTasksACType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((tl) => {
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
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export const addTaskAC = (todolistId: string, newTask: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", todolistId, newTask}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((response) => dispatch(setTasksAC(todolistId, response.data.items)))
}

export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<TasksActionsType>) => {
    todolistsAPI.createTask(todolistID, title)
        .then((res) => dispatch(addTaskAC(todolistID, res.data.data.item)))
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
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
            .then((response => dispatch(changeTaskStatusAC(taskId, status, todolistId))))
    }
}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => async (dispatch, getState) => {
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
        } catch (e) {
            //some error
        }
    }


}

