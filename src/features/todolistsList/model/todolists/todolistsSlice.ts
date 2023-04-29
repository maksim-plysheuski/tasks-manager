import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions";
import { RequestStatusType } from "app/appSlice";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums/enums";
import { Todolist, UpdateTodolist } from "features/todolistsList/api/todolistsApi/todolistsApi.types";
import { todolistsApi } from "features/todolistsList/api/todolistsApi/todolistsApi";


export type FilterValues = "all" | "active" | "completed";

export type TodolistDomain = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todo",
  initialState: [] as TodolistDomain[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValues }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomain = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle"
        };
        state.unshift(newTodolist);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return [];
      });
  }
});

const fetchTodolists = createAppAsyncThunk<{ todolists: Todolist[] }, void>(
  "todo/fetchTodolists",
  async (_) => {
    const res = await todolistsApi.fetchTodolists();
    return { todolists: res.data };
  }
);

const addTodolist = createAppAsyncThunk<{ todolist: Todolist }, string>(
  "todo/addTodolist",
  async (title, thunkAPI) => {
    const res = await todolistsApi.createTodolist(title);
    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item };
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  }
);

const removeTodolist = createAppAsyncThunk<{ id: string }, string>("todo/removeTodolist", async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
  const res = await todolistsApi.deleteTodolist(id);
  if (res.data.resultCode === ResultCode.Success) {
    return { id };
  } else {
    return rejectWithValue(null);
  }
});

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolist, UpdateTodolist>(
  "todo/changeTodolistTitle",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const res = await todolistsApi.updateTodolist(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(null);
    }
  }
);

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle };