import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";
import { authApi, LoginParams, Profile } from "../api/auth-api";
import { clearTasksAndTodolists } from "common/actions";


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false as boolean,
    userProfile: {} as Profile
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled,
        (state, action: PayloadAction<{ profile: Profile, isLoggedIn: boolean }>) => {
          state.userProfile = action.payload.profile;
        })
      .addMatcher(isAnyOf(login.fulfilled, logout.fulfilled, initializeApp.fulfilled),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        });
  }
});

const initializeApp = createAppAsyncThunk<{ profile: Profile, isLoggedIn: boolean }, void>("app/initializeApp", async (_, { rejectWithValue }) => {
  const res = await authApi.me();
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true, profile: res.data.data };
  } else {
    return rejectWithValue(res.data);
  }
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>("auth/login", async (arg, { rejectWithValue }) => {
  const res = await authApi.login(arg);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authApi.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});

export const authReducer = slice.reducer;
export const authThunks = { initializeApp, login, logout };