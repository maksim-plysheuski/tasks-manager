import {todolistsAPI, TodolistType} from "../api/todolists-api"
import {AppThunk} from "../app/store";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title, todolistId}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists}) as const


export const getTodosTC = (): AppThunk => async dispatch => {
    try {
        const response = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(response.data))
    } catch (e) {
        throw new Error("some error")
    }
}


export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    await todolistsAPI.deleteTodolist(todolistId)
    try {
        dispatch(removeTodolistAC(todolistId))
    } catch (err) {
        throw new Error("some error")
    }
}


export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    let response = await todolistsAPI.createTodolist(title)
    try {
        dispatch(addTodolistAC(title, response.data.data.item.id))
    } catch (err) {
        throw new Error("some error")
    }
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    await todolistsAPI.updateTodolist(id, title)
    try {
        dispatch(changeTodolistTitleAC(id, title))
    } catch (e) {
        //some error
    }
}

