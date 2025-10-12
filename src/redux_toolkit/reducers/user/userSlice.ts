import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type UserState } from "../../../types/user.types";
const initialState: UserState = {
  loggedIn: false,
  user: null,
};

const fetchLoginStatus = createAsyncThunk("fetchLoginStatus", async () => {
  const response = await fetch("/api/auth", {
    method: "post",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error("User not logged in");
  }

  return { success: true, user: data.user };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.loggedIn = true;
    },
    removeUser: (state) => {
      console.log("arrived");
      state.loggedIn = false;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoginStatus.rejected, (state, action) => {
        console.log(action.error.message);
        state.loggedIn = false;
        state.user = null;
      })
      .addCase(fetchLoginStatus.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loggedIn = true;
          state.user = action.payload.user;
        }
      });
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userActions, userReducer, fetchLoginStatus };
