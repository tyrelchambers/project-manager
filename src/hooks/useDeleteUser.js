import { useMutation } from "react-query";
import { deleteUser } from "../api/deleteUser";

export const useDeleteUser = () => {
  const mutation = useMutation((data) => deleteUser, {
    onSuccess: () => {
      window.localStorage.clear();
      window.location.pathname = "/";
    },
  });
  return mutation;
};
