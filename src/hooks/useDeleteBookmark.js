import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteBookmark } from "../api/deleteBookmark";

export const useDeleteBookmark = () => {
  const qClient = useQueryClient();
  const mutation = useMutation((data) => deleteBookmark(data), {
    onSuccess: () => {
      qClient.invalidateQueries("bookmarks");
      toast.success("Bookmark deleted");
    },
  });
  return mutation;
};
