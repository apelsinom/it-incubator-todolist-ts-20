import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/appSlice";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Переносим повторяющийся код в .addMatcher
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(initializeApp.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      .addMatcher(
        /*        (action: UnknownAction) => {
                  if (
                    action.type === "auth/login/fulfilled" ||
                    action.type === "auth/logout/fulfilled" ||
                    action.type === "auth/initializeApp/fulfilled"
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                },*/
        // Для сокращения кода применяем встроенную в @reduxjs/toolkit утилитку isAnyOf
        // isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
        // Или так
        isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      );
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.me().finally(() => dispatch(appActions.setAppInitialized({ isInitialized: true })));
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
