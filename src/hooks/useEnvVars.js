import { useMutation } from "react-query";

export const useEnvVars = () => {
  const createEnv = useMutation((data) => createEnv(data));

  return { createEnv };
};
