import { AppRootStateType } from "app/store";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectUserEmail = (state: AppRootStateType) => state.auth.profile.email;
