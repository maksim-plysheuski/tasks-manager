import { createSlice } from "@reduxjs/toolkit";
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolists-slice";
import { createAppAsyncThunk } from "common/utils";
import { clearTasksAndTodolists } from "common/actions";
import { appActions } from "app/app-slice";
import { ResultCode } from "common/enums/common-enums";
import {
  AddTask,
  RemoveTask, tasksApi,
  Task,
  UpdateTask,
  UpdateTaskModel
} from "features/TodolistsList/api/tasks-api";


export type TasksStateType = {
  [key: string]: Array<Task>;
};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  }
});

const fetchTasks = createAppAsyncThunk<{ tasks: Task[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId) => {
    const res = await tasksApi.getTasks(todolistId);
    const tasks = res.data.items;
    return { tasks, todolistId };
  }
);

const addTask = createAppAsyncThunk<{ task: Task }, AddTask>("tasks/addTask", async (arg, { rejectWithValue }) => {
  const res = await tasksApi.createTask(arg);
  if (res.data.resultCode === ResultCode.Success) {
    const task = res.data.data.item;
    return { task };
  } else {
    return rejectWithValue(res.data);
  }
});

const updateTask = createAppAsyncThunk<UpdateTask, UpdateTask>(
  "tasks/updateTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const state = getState();
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
    if (!task) {
      dispatch(appActions.setAppError({ error: "SingleTask not found in the state" }));
      return rejectWithValue(null);
    }

    const updatedTask: UpdateTaskModel = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel
    };

    const payload = { todolistId: arg.todolistId, taskId: arg.taskId, domainModel: updatedTask };

    const res = await tasksApi.updateTask(payload);

    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(res.data);
    }
  }
);

const removeTask = createAppAsyncThunk<RemoveTask, RemoveTask>(
  "tasks/removeTask",
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.deleteTask(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(res.data);
    }
  }
);


export const tasksReducer = slice.reducer;
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };
