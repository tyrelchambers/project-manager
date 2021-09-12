import { request } from "../config/axios";

export const signup = (data) => {
  return request.post("/v1/auth/signup", data);
};
