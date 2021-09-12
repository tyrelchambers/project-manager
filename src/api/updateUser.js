import { request } from "../config/axios";

export const updateUser = async (state) => {
  return await request.post("/v1/user/update", state);
};
