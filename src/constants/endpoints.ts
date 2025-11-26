const API_PREFIX = "api";
// ví dụ về những cái endpoint

const authEndpoint = {
  LOGIN: `${API_PREFIX}/auth/login`,
  REGISTER:`${API_PREFIX}/auth/register`
};
const userProfileEndpoint = {
  GET_PROFILE: `${API_PREFIX}/users/profile`,
  UPDATE_INFOMATION : `${API_PREFIX}/users/profile`
}
const todoListEndPoint = {
  CREATE_TODOLIST_FORUER:`${API_PREFIX}/todo`,
  GET_LIST_TODPLIST_FOR_USER : `${API_PREFIX}/todo`,
  UPDATE_TODOLIST_FOR_USER:`${API_PREFIX}/todo/{id}`,
  DELETE_TODOLIST_FOR_USER:`${API_PREFIX}/todo/{todoId}`,
  GET_TODO_DETAIL_LIST_FOR_USER:`${API_PREFIX}/todo/{id}`
}
export {
  authEndpoint,
  userProfileEndpoint,
  todoListEndPoint
};

