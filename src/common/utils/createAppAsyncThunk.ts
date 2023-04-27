import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppRootState } from "app/store";
import { BaseResponse } from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponse;
}>();