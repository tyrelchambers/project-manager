import { request } from "../config/axios";

export const getSnippet = (data) => {
  return request.get(`/v1/snippets/${data}`);
};
