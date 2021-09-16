import { request } from "../config/axios";

export const likePost = (data) => {
  return request.post(`/v1/feed/${data}/like`);
};
