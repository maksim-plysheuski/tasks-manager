import { AppRootState } from "app/store";


export const selectAppStatus = (state: AppRootState) => state.app.status;
export const selectAppError = (state: AppRootState) => state.app.error;
export const selectIsAppInitialized = (state: AppRootState) => state.app.isInitialized;