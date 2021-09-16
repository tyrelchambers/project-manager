import { request } from "../config/axios";

export const deleteUser = () => {
  return request.delete("/v1/user/me");
};
