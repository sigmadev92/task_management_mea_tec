import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/user/userSlice";
import { tasksReducer } from "../reducers/task/tasksSlice";
import { themeReducer } from "../reducers/theme/themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
