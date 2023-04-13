import { createSlice } from "@reduxjs/toolkit";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { createAppAsyncThunk } from "../../../common/utils/createAppAsyncThunk";


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  }
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg);
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
    const res = await authAPI.logout();
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
    const res = await authAPI.me();
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