import { useMutation } from "react-query";
import { dislikePost } from "../api/dislikePost";

export const useDislikePost = () => {
  const mutation = useMutation((data) => dislikePost(data));
  return mutation;
};
