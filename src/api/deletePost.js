import { request } from "../config/axios";

export const deletePost = (data) => {
  return request.delete(`/v1/feed/${data}`);
};
