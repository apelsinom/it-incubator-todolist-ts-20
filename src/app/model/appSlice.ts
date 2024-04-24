import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { todolistsThunks } from "features/TodolistsList/model/todolistsSlice";
import { tasksThunks } from "features/TodolistsList/model/tasksSlice";
import { authThunks } from "features/auth/model/authSlice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      /*      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith("/pending");
        },
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith("/fulfilled");
        },
        (state) => {
          state.status = "succeeded";
        },
      )
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith("/rejected");
        },
        (state) => {
          state.status = "failed";
        },
      )*/
      // Для сокращения кода применяем встроенные в @reduxjs/toolkit утилитки: isPending, isFulfilled, isRejected
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed";
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.initializeApp.rejected.type
          ) {
            return;
          }
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      });
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
