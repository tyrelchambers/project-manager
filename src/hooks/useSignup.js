import { useMutation } from "react-query";
import { signup } from "../api/signup";

export const useSignup = () => {
  const mutation = useMutation((data) => signup(data), {
    onSuccess: (res) => {
      window.localStorage.setItem("token", res.token);
      window.location.pathname = "/";
    },
  });
  return mutation;
};
