import { request } from "../config/axios";

export const login = async (data) => {
  return await request.post("/v1/auth/login", data);
};
