import { request } from "../config/axios";

export const getPosts = () => {
  return request.get("/v1/feed");
};
