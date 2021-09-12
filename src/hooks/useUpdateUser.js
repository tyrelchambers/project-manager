import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../api/updateUser";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((update) => updateUser(update), {
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
    },
  });

  return mutation;
};
