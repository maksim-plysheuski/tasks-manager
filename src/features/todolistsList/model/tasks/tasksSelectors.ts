import { AppRootState } from "app/store";


export const selectTasks = (state: AppRootState) => state.tasks;