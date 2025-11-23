import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role_name: string;
  face_id: string;
  created_at: string;
  updated_at: string;
  avartar_url: string;
  reset_token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

