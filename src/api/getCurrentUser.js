import { request } from "../config/axios";

export const getCurrentUser = async (token) => {
  return await request.get("/v1/user/me", { headers: { token } });
};
