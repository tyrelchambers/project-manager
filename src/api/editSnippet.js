import { request } from "../config/axios";

export const editSnippet = ({ snippet, data }) => {
  return request.patch(`/v1/snippets/${snippet.uuid}/edit`, data);
};
