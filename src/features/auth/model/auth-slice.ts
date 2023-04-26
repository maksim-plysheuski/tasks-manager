import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";
import { authApi, LoginParamsType, ProfileType } from "../api/auth-api";
import { clearTasksAndTodolists } from "common/actions";


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false as boolean,
    profile: {} as ProfileType
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled,
        (state, action: PayloadAction<{ profile: ProfileType, isLoggedIn: boolean }>) => {
          state.profile = action.payload.profile
      })
      .addMatcher(isAnyOf(login.fulfilled, logout.fulfilled, initializeApp.fulfilled),
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        });
  }
});

const initializeApp = createAppAsyncThunk<{ profile: ProfileType, isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await authApi.me();
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true, profile: res.data.data };
  } else {
    return rejectWithValue(res.data);
  }
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, { rejectWithValue }) => {
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

export const authSlice = slice.reducer;
export const authThunks = { initializeApp, login, logout };