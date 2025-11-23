import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/constants";
import webStorageClient from "@/utils/webStorageClient";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // lưu cái api ở đây 
  prepareHeaders: (headers) => {
    const token = webStorageClient.getToken();
    if (token) headers.append("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
