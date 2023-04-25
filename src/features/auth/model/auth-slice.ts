import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { thunkTryCatch } from "common/utils";
import { appActions } from "app/app-slice";
import { ResultCode } from "common/enums";
import { authApi, LoginParamsType } from "../api/auth-api";
import { clearTasksAndTodolists } from "common/actions";


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        });
  }
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      const isShowAppError = !res.data.fieldsErrors.length;
      handleServerAppError(res.data, dispatch, isShowAppError);
      return rejectWithValue(res.data);
    }
  });
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.me();
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  }
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };