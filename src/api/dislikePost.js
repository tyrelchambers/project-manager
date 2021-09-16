import { request } from "../config/axios";

export const dislikePost = (data) => {
  return request.delete(`/v1/feed/${data}/dislike`);
};
