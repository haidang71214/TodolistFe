import { UpdateUserDto, UserDto } from "@/types";
import { baseApi } from "../base";
import { userProfileEndpoint } from "@/constants/endpoints";

export const todoApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getAllTodoList
  }),
});


export const {
   
} = todoApi;
