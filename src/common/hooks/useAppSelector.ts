import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppRootState } from "app/store";


export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;