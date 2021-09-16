import { request } from "../config/axios";

export const createSnippet = (data) => {
  return request.post("/v1/snippets/save", data);
};
