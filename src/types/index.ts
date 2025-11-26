import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type LoginRequest = {
  email: string;
  password: string;
};
// đã nhét user vào đây
export type LoginResponse = {
  token: string;
  user: Users;
};

export enum TaskStatusEnum {
  PROGRESS="PROGRESS",
  DONE="COMPLETE",
  PENDING="IN_PROGRESS" 
}

export enum PriorityEnums {
  URGENT="URGENT",
  CLEAR="CLEAR",
  LOW="LOW",
  MEDIUM = "NOMAL",
  HIGH = "HIGHT"
}

export enum RoleEnums {
  CLIENT = 0,
  ADMIN = 1
}

export interface Users {
  id: string;
  name?: string | null;
  password?: string | null;
  age: number;
  imagesUrl?: string | null;
  email: string;
  role: RoleEnums;
  ownedProjects: Projects[];
  projects: Projects[];
}

export interface Todolists {
  id: string;
  name: string;
  taskStatus: TaskStatusEnum;
  priority: PriorityEnums;
  comment?: string | null;
  todoSectionId?: string | null;
  todoSection: TodoSection;
  timeStart: string;
  timeEnd: string;
  usersId?: string | null;
  user: Users;
}
export type TodolistsArray = Todolists[]; // array các todo

export interface TodoSection {
  id: string;
  projectId: string;
  projects: Projects;
  todolists: Todolists[];
  dateStart: string;
  dateEnd: string;
}

export interface Projects {
  id: string;
  projectName: string;
  note?: string | null;
  users: UserDto[];
  todosection: TodoSection[];
  startTime: string;
  endTime: string;
}

export interface CreateProjectDto {
  projectName: string;
  note?: string | null;
  usersIds: string[];
  startTime: string;
  endTime: string;
}

export interface UpdateProjectDto {
  projectName?: string | null;
  note?: string | null;
  usersIds?: string[] | null;
  startTime?: string | null;
  endTime?: string | null;
}

export interface ProjectResponse {
  id: string;
  projectName: string;
  note?: string | null;
  users: UserDto[];
  todosection: TodoSection[];
  startTime: string;
  endTime: string;
}

export interface RegisterRequestDto {
  name?: string | null;
  password?: string | null;
  age: number;
  imagesUrl?: string | null;
  email?: string | null;
}

export interface RegisterResponseDto {
  id: number;
  name?: string | null;
  password?: string | null;
  age: number;
  imagesUrl?: string | null;
  email?: string | null;
  role: RoleEnums;
}

export interface CreateTodoListSectionDto {
  name?: string | null;
  taskStatus?: TaskStatusEnum;
  priority?: PriorityEnums;
  comment?: string | null;
  timeStart: string;
  timeEnd: string;
}

export interface TodolistCreateRequestDto {
  name: string;
  taskStatus: string;
  priority: string;
  comment: string;
  timeStart: string;
  timeEnd: string;
}


export interface TodolistUpdateRequestDto {
  name?: string | null;
  taskStatus?: TaskStatusEnum | null;
  priority?: PriorityEnums | null;
  comment?: string | null;
  timeStart?: string | null;
  timeEnd?: string | null;
}

export interface TodolistResponseDto {
  id: string;
  name?: string | null;
  taskStatus?: TaskStatusEnum | null;
  priority?: PriorityEnums | null;
  comment?: string | null;
  timeStart: string;
  timeEnd: string;
  user: Users;
}

export interface CreateSection {
  todolists: string[];
  dateStart: string;
  dateEnd: string;
}

export interface UpdateSectionDto {
  todolists: string[];
  dateStart: string;
  dateEnd: string;
}

export interface UserDto {
  id: string;
  name?: string | null;
  email?: string | null;
  imagesUrl?: string | null;
  age: number;
  role?: string | null;
}

export interface CreateUserDto {
  name?: string | null;
  password?: string | null;
  imagesUrl?: string | null;
  age: number;
}

export interface UpdateUserDto {
  name?: string | null;
  password?: string | null;
  email?: string | null;
  imagesUrl?: string | null;
  age?: number | null;
}