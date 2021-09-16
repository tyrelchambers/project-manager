import { useQuery } from "react-query";
import { getPosts } from "../api/getPosts";

export const useGetPosts = () => {
  const query = useQuery("posts", getPosts);
  return query;
};
