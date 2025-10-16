import { createSlice } from "@reduxjs/toolkit";
import type { Theme } from "../../../types/theme.types";

const initialState: Theme = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    loadTheme: (state, action) => {
      console.log(state.theme);
      document.documentElement.classList.toggle(
        "dark",
        action.payload === "dark"
      );
    },
    setTheme: (state, action) => {
      const currTheme = action.payload;
      const newTheme = currTheme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("task_Theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    },
  },
});

const themeReducer = themeSlice.reducer;
const themeActions = themeSlice.actions;

export { themeActions, themeReducer };
