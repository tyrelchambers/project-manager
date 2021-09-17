import { request } from "../config/axios";

export const createEnvVar = (data) => {
  return request.post("/v1/env/new", data);
};
