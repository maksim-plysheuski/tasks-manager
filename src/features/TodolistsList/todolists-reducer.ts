import {todolistsAPI, TodolistType} from "../../api/todolists-api"
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC, SetStatusType} from "../../app/app-reducer";


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
      {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0,
                entityStatus: 'idle'
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status}: tl)
        }
        default:
            return state;
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", todolistId} as const )
export const addTodolistAC = (title: string, todolistId: string) => ({type: "ADD-TODOLIST", title, todolistId} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)
export const changeEntityStatusAC = (id: string, status: RequestStatusType) => ({type: 'CHANGE-ENTITY-STATUS', id, status} as const)


export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(response.data))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        throw new Error("some error")
    }
}


export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))
    let response = await todolistsAPI.deleteTodolist(todolistId)
    try {
        if (response.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (response.data.messages.length) {
                dispatch(setAppErrorAC(response.data.messages[0]))
            } else {
                dispatch(setAppErrorAC("Some error"))
            }
        }
    } catch (err) {
        throw new Error("some error")
    }
}


export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    let response = await todolistsAPI.createTodolist(title)
    try {
        if (response.data.resultCode === 0) {
            dispatch(addTodolistAC(title, response.data.data.item.id))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (response.data.messages.length) {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC(response.data.messages[0]))
            } else {
                dispatch(setAppErrorAC("Some error"))
            }
            dispatch(setAppStatusAC('failed'))
        }
    } catch (err) {
        dispatch(setAppErrorAC("some error"))
        dispatch(setAppStatusAC("failed"))
    }
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    await todolistsAPI.updateTodolist(id, title)
    try {
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        //some error
    }
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type TodolistActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetStatusType
    | ReturnType<typeof changeEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

