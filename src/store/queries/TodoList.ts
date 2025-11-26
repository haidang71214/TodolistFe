import { TodolistCreateRequestDto, TodolistResponseDto, TodolistsArray, TodolistUpdateRequestDto} from "@/types";
import { baseApi } from "../base";
import { todoListEndPoint } from "@/constants/endpoints";

export const todoApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getAllTodoListForUser:builder.query<TodolistsArray, void>({
      query:()=>({
         url:todoListEndPoint.GET_LIST_TODPLIST_FOR_USER,
         method:"GET",
      }),
      transformResponse: (response: { result: TodolistsArray }) => response.result,
            providesTags: ["todoForUser"],
    }),
updateTodolistForUser: builder.mutation<void, { id: string; dto: TodolistUpdateRequestDto }>({
  query: ({ id, dto }) => ({
    url: todoListEndPoint.UPDATE_TODOLIST_FOR_USER.replace("{id}", id),
    method: "PATCH",
    body: dto   
  }),
  invalidatesTags: ["todoForUser"],
}),

deleteTodolistForUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
    url:todoListEndPoint.DELETE_TODOLIST_FOR_USER.replace("{todoId}", id), 
    method: "DELETE",

  }),
  invalidatesTags: ["todoForUser"], 
}),
 getDetalTodoListForUser:builder.query<TodolistResponseDto, {id:string}>({
      query:({id})=>({
         url:todoListEndPoint.GET_TODO_DETAIL_LIST_FOR_USER.replace("{id}",id),
         method:"GET",
      }),
      transformResponse: (response: { result: TodolistResponseDto }) => response.result,
    }),
// Trong file queries/TodoList.ts
createTodoListForUser: builder.mutation<void, TodolistCreateRequestDto>({
  query: (data) => ({
    url: todoListEndPoint.CREATE_TODOLIST_FORUER,
    method: "POST",
    body: data 
  }),

  invalidatesTags: ["todoForUser"],
}),

  }),
});


export const {
useGetAllTodoListForUserQuery,
useDeleteTodolistForUserMutation,
useUpdateTodolistForUserMutation,
useGetDetalTodoListForUserQuery,
useCreateTodoListForUserMutation
} = todoApi;
