import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  face_id: string;
  created_at: string;
  updated_at: string;
  imagesUrl: string;
  reset_token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
// đã nhét user vào đây
export type LoginResponse = {
  token: string;
  user: User;
};

