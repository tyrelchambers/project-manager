import { request } from "../config/axios";

export const deleteSnippet = (data) => {
  return request.post(`/v1/snippets/${data}/delete`);
};
