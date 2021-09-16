import { useMutation, useQueryClient } from "react-query";
import { socket } from "..";
import { likePost } from "../api/likePost";

export const useLikePost = ({ post, user }) => {
  const qClient = useQueryClient();
  const mutation = useMutation((data) => likePost(data), {
    onSuccess: () => {
      qClient.invalidateQueries("posts");
    },
  });
  if (mutation.isSuccess) {
    socket.emit("notification post like", {
      from: user.uuid,
      to: post.User.uuid,
      type: "post_like",
      post: post.uuid,
    });
  }
  return mutation;
};
