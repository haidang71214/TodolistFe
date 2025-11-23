import { LoginRequest, LoginResponse } from "@/types";
import { baseApi } from "../base";

import { authEndpoint } from "@/constants/endpoints";

// viết mutation ở đây 
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ result: LoginResponse }, LoginRequest>({
      query: (params) => ({
        url: authEndpoint.LOGIN,
        method: "POST",
        body: params,
      }),
    }),
    // đọc dữ liệu
    // checkTokenRole: builder.query<{ role: string | null }, string>({
    //   query: (token) => ({
    //     url: authEndpoint.CHECK_TOKEN.replaceAll("{token}", token),
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
} = authApi;
