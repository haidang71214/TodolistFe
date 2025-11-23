import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
import webStorageClient from "@/utils/webStorageClient";
import { authApi } from "../queries/auth";
interface AuthSlickInterface {
  isAuthenticatedAccount: boolean;
  user?: User;
}

const initialState: AuthSlickInterface = {
  isAuthenticatedAccount: false,
};
// tạo slice để phân phát state
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFromToken: (state, action) => {
      state.user = action.payload;
      state.isAuthenticatedAccount = true;
    },
    clearLoginToken: (state) => {
      state.user = undefined;
      state.isAuthenticatedAccount = false;
      webStorageClient.setToken("");
    },
  },
  // xử lí action ngoài slice, slice bình thường sẽ không gọi những thứ này 
  extraReducers: (builder) => {
    // match với api, nếu api call thành công thì action sẽ khớp matcher này  Khi login API thành công, lưu token và user vào state Redux
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        webStorageClient.setToken(action.payload?.result.token);
        state.user = action.payload.result.user;
        if (state.user.user_id) state.isAuthenticatedAccount = true;
      },
    );
  },
});

export const { loginFromToken, clearLoginToken } = authSlice.actions;

export default authSlice.reducer;
