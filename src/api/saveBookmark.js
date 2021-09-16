import { request } from "../config/axios";

export const saveBookmark = (data) => {
  return request.post("/v1/bookmarks/save", data);
};
