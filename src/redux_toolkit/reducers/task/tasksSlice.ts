import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Task, TasksState } from "../../../types/task.types";
const initialState: TasksState = { tasks: [] };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const taskIdx = state.tasks.findIndex((t) => t.id === action.payload);
      if (taskIdx >= 0) {
        const st = state.tasks[taskIdx].status;
        state.tasks[taskIdx].status =
          st === "completed" ? "pending" : "completed";
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

const tasksReducer = tasksSlice.reducer;
const tasksActions = tasksSlice.actions;

export { tasksActions, tasksReducer };
