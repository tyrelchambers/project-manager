import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createSnippet } from "../api/createSnippet";

export const useCreateSnippet = () => {
  const qClient = useQueryClient();
  const mutation = useMutation((data) => createSnippet(data), {
    onSuccess: () => {
      qClient.invalidateQueries("snippets");
      toast.success("Snippet created");
    },
  });
  return mutation;
};
