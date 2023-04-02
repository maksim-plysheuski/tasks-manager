import { setAppErrorAC, setAppStatusAC} from '../app/app-reducer'
import { Dispatch } from 'redux'


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}