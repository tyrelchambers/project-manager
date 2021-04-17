import Axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/config";

const BACKEND = config[process.env.NODE_ENV].backend;

export const getAxios = async ({
  method = "get",
  data = {},
  params = {},
  url = "",
} = {}) => {
  const token = await window.localStorage.getItem("token");

  return await Axios({
    method,
    url: `${BACKEND}/api/v1${url}`,
    data,
    headers: {
      token,
    },
    params: {
      ...params,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        if (res.data.message) {
          toast.success(res.data.message);
        }

        if (res.data.error) {
          toast.error(res.data.error);
        }
        return res.data;
      }
    })
    .catch((err) => {
      if (err.response.data) {
        toast.error(err.response.data);
      }
      if (err.response.data?.error) {
        toast.error(err.response.data.error);
      }
      if (err.response.data?.action === "USER_NOT_FOUND") {
        window.sessionStorage.removeItem("token");
        window.localStorage.removeItem("token");
        window.location.pathname = "/";
      }
      return err;
    });
};
