import Axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND;

export const getAxios = async ({
  method = "get",
  data = {},
  params = {},
  options = {
    withToken: false,
  },
  url = "",
} = {}) => {
  const token = await window.localStorage.getItem("token");

  if (options.withToken && !token) {
    return;
  }
  return await Axios({
    method,
    url: `${BACKEND}/api/v1${url}`,
    data,
    headers: {
      ...(options.withToken && { token }),
    },
    params: {
      ...params,
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data);
      }
      return false;
    });
};
