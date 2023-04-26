import { instance } from "common/api";
import { BaseResponseType } from "common/types";

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<LoginLogoutType>>("auth/login", data);
  },
  logout() {
    return instance.delete<BaseResponseType<LoginLogoutType>>("auth/login");
  },
  me() {
    return instance.get<BaseResponseType<ProfileType>>("auth/me");
  }
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type ProfileType = {
  id: number;
  email: string;
  login: string
}

type LoginLogoutType = {
  userId?: number
}
