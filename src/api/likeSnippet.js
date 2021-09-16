import { request } from "../config/axios";

export const likeSnippet = (data) => {
  return request.post(`/v1/snippets/${data}/like`);
};
