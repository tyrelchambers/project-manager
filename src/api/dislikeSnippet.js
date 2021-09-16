import { request } from "../config/axios";

export const dislikeSnippet = (data) => {
  return request.post(`/v1/snippets/${data}/dislike`);
};
