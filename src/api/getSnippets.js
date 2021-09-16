import { request } from "../config/axios";

export const getSnippets = () => {
  return request.get("/v1/snippets/me");
};
