import { getCookie, setCookie } from "cookies-next";
import Cookies from "js-cookie";
import _ from "lodash";

import { ACCESS_TOKEN } from "@/constants";

type CookieOption = Record<string, unknown>; // thay any
type RawValue = string | number | boolean | Record<string, unknown> | unknown[]; // thay any

const webStorageClient = {
  set(key: string, rawValue: RawValue, option?: CookieOption) {
    const value = _.isString(rawValue)
      ? rawValue
      : JSON.stringify(rawValue);

    setCookie(key, value, option);
  },

  get(key: string) {
    const value = (getCookie(key, { path: "/" }) as string) || "";

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },

  remove(key: string) {
    setCookie(key, null, { maxAge: 0 });
  },

  removeAll() {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  },

  setToken(value: string, option?: CookieOption) {
    setCookie(ACCESS_TOKEN, value, option);
  },

  getToken() {
    return getCookie(ACCESS_TOKEN) as string;
  },
};

export default webStorageClient;
