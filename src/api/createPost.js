import { request } from "../config/axios";
export const createPost = (data) => {
  return request.post("/v1/feed/post", data);
};
