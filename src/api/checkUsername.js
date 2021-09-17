import { request } from "../config/axios";

export const checkUsername = (data) => {
  return request.get(`/v1/user/username`, { params: data });
};
