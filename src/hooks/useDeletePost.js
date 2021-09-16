import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../api/deletePost";

export const useDeletePost = () => {
  const qClient = useQueryClient();
  const mutation = useMutation((data) => deletePost(data), {
    onSuccess: () => {
      qClient.invalidateQueries("posts");
    },
  });
  return mutation;
};
