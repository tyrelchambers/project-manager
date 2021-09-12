import { useMutation } from "react-query";
import { login } from "../api/login";

export const useLogin = () => {
  const mutation = useMutation((data) => login(data), {
    onSuccess: (res) => {
      window.localStorage.setItem("token", res.token);
      window.location.pathname = "/";
    },
  });
  return mutation;
};
