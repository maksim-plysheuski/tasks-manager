import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/login/auth-reudcer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
//action creators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

//thunks
export const initializeAppTC  = () => (dispatch: Dispatch) => {
    authAPI.authMe()
        .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error, dispatch))
        .finally(() => dispatch(setIsInitializedAC(true)))
}


//types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppInitializeType= ReturnType<typeof setIsInitializedAC>
type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | setAppInitializeType