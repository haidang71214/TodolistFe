import { EmailResetRequest, LoginRequest, LoginResponse, ResetPasswordRequest } from "@/types";
import { baseApi } from "../base";
import { authEndpoint } from "@/constants/endpoints";

// Định nghĩa type cho register (thêm vào file types nếu chưa có)
export interface RegisterRequest {
  name?: string;
  password?: string;
  age: number;
  imagesUrl?: string;
  email?: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  imagesUrl?: string;
  // thêm field khác nếu backend trả về
}

export const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Login hiện tại của mày
    login: builder.mutation<{ result: LoginResponse }, LoginRequest>({
      query: (params) => ({
        url: authEndpoint.LOGIN,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["User"],
    }),

    // Thêm Register mutation ở đây
    register: builder.mutation< { result: RegisterResponse }, RegisterRequest>({
      query: (params) => ({
        url: authEndpoint.REGISTER,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["User"], // nếu register thành công thì cũng invalidate để fetch lại user nếu cần
    }),
    sendMailReset: builder.mutation<void, EmailResetRequest>({
      query: (body) => ({
        url: authEndpoint.SEND_RESET_PASS, // hoặc dùng authEndpoint.RESET_MAIL nếu bạn định nghĩa trong constants
        method: "POST",
        body,
      }),
    }),

    // === ĐỔI MẬT KHẨU BẰNG TOKEN ===
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (body) => ({
        url: authEndpoint.SEND_CHANGE_PASS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], 
    }),
  }),
});

// Export cả 2 hook luôn cho tiện dùng
export const {
  useLoginMutation,
  useRegisterMutation, // mới thêm
  useResetPasswordMutation,
  useSendMailResetMutation
} = authApi;