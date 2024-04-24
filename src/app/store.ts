import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "features/TodolistsList/model/tasksSlice";
import { todolistsReducer } from "features/TodolistsList/model/todolistsSlice";
import { appSlice } from "app/appSlice";
import { authSlice } from "features/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appSlice,
    auth: authSlice,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
