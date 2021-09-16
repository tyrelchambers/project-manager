import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { saveBookmark } from "../api/saveBookmark";

export const useSaveBookmark = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => saveBookmark(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("bookmarks");
      toast.success("Bookmark saved!");
    },
  });

  return mutation;
};
