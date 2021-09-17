import axios from "axios";
import { toast } from "react-toastify";
import { config } from "./config";

const instance = axios.create({
  baseURL: `${config[process.env.NODE_ENV].backend}/api`,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log(res);
    return res.data;
  },
  (err) => {
    toast.error(err.response.data.error);
    return Promise.reject(err);
  }
);

export const request = instance;
