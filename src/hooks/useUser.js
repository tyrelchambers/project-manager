import { useQuery } from "react-query";
import { getCurrentUser } from "../api/getCurrentUser";
import useStorage from "./useStorage";

export const useUser = () => {
  const [token] = useStorage("token");
  const query = useQuery("currentUser", () => getCurrentUser(token), {
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
  return query;
};
