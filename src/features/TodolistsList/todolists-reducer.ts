import {todolistsAPI, TodolistType} from "../../api/todolists-api"
import {AppThunk} from "../../app/store";
import {RequestStatusType, setStatusAC, SetStatusType} from "../../app/app-reducer";


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


export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC('loading'))
        const response = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(response.data))
        dispatch(setStatusAC('succeeded'))

    } catch (e) {
        throw new Error("some error")
    }
}


export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))
    await todolistsAPI.deleteTodolist(todolistId)
    try {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setStatusAC('succeeded'))
    } catch (err) {
        throw new Error("some error")
    }
}


export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))
    let response = await todolistsAPI.createTodolist(title)
    try {
        dispatch(addTodolistAC(title, response.data.data.item.id))
        dispatch(setStatusAC('succeeded'))
    } catch (err) {
        throw new Error("some error")
    }
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))
    await todolistsAPI.updateTodolist(id, title)
    try {
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setStatusAC('succeeded'))
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

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

