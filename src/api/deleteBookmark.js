import { request } from "../config/axios";

export const deleteBookmark = (data) => {
  return request.delete("/v1/bookmarks/remove", data);
};
