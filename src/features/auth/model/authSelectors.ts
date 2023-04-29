import { AppRootState } from "app/store";

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn;
export const selectUserEmail = (state: AppRootState) => state.auth.userProfile.email;