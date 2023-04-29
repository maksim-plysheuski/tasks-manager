import { instance } from "common/api";
import { BaseResponse } from "common/types";

export const authApi = {
  login(data: LoginParams) {
    return instance.post<BaseResponse<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<BaseResponse<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<BaseResponse<Profile>>("auth/me");
  }
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type Profile = {
  id: number;
  email: string;
  login: string
}