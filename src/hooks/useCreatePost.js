import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createPost } from "../api/createPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => createPost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast.success("Post sent to the internet!");
    },
  });

  return mutation;
};
