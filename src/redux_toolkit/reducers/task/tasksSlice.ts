import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import type {
  EditTask,
  NewTask,
  Task,
  TasksState,
} from "../../../types/task.types";
const initialState: TasksState = { tasks: [] };

// thunk operations
const fetchAllTasks = createAsyncThunk("fetchAllTasks", async () => {
  const response = await fetch("/api/tasks", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error while fetching the tasks ${response.status}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return { success: true, tasks: data.tasks };
});
const addNewTask = createAsyncThunk("addNew", async (newTask: NewTask) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(newTask),
  });
  if (!response.ok) {
    throw new Error(`Failed while Adding Task ${response.status}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }

  return { success: true, newTask: data.newTask };
});

const editTask = createAsyncThunk(
  "editTask",
  async ({ id, status, title, description }: EditTask) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ status, title, description }),
    });
    if (!response.ok) {
      throw new Error(`Failed while Updating Task ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return { success: true, id, task: data.task };
  }
);

const removeTask = createAsyncThunk("removeTask", async (taskId: string) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    credentials: "include",
    method: "DELETE",
  });
  console.log(taskId);
  if (!response.ok) {
    throw new Error(`Failed while Deleting the Task ${response.status}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }

  return { success: true, taskId };
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllTasks.rejected, (state, action) => {
        console.log(action.error.message);
        message.warning("Failed to Fetch Tasks");
        state.tasks = [];
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
      });
    builder
      .addCase(addNewTask.rejected, (state, action) => {
        console.log(action.error.message);
        message.warning("Failed to add New Task");
        console.log(state.tasks);
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.newTask);
        message.success("New Task added");
      });
    builder
      .addCase(editTask.rejected, (state, action) => {
        console.log(action.error.message);
        message.warning("Failed to Update Task");
        console.log(state.tasks);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { id, task } = action.payload;
        const taskIdx = state.tasks.findIndex((task) => task.id === id);
        if (taskIdx < 0) {
          //in case of racing [concurrent requests]
          message.warning("Failed to Update Task");
          return;
        }
        state.tasks[taskIdx] = task;
        message.success("Task Updated");
      });
    builder
      .addCase(removeTask.rejected, (state, action) => {
        console.log(action.error.message);
        console.log(state.tasks);
        message.warning("Failed to Delete Task");
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { taskId } = action.payload;
        const taskIdx = state.tasks.findIndex(
          (task: Task) => task.id === taskId
        );
        if (taskIdx < 0) {
          //in case of racing [concurrent requests]
          message.warning("Failed to Delete Task");
          return;
        }
        state.tasks.splice(taskIdx, 1);
        message.success("Task Deleted");
      });
  },
});

const tasksReducer = tasksSlice.reducer;
const tasksActions = tasksSlice.actions;

const taskThunk = {
  addNewTask,
  fetchAllTasks,
  editTask,
  removeTask,
};
export { tasksActions, tasksReducer, taskThunk };
