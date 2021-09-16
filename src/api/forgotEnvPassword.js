import { request } from "../config/axios";

export const forgotEnvPassword = () => {
  return request.post("/v1/auth/forgot_environment_password");
};
