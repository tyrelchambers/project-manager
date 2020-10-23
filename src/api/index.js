import Axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND;

export const getAxios = async ({
  method = "get",
  data = {},
  params = {},
  options = {
    withToken: true,
    withVisitorToken: false,
  },
  url = "",
} = {}) => {
  const token = await window.localStorage.getItem("token");
  const visitorToken = await window.localStorage.getItem("visitorToken");

  if (options.withToken && !token) {
    return;
  }
  return await Axios({
    method,
    url: `${BACKEND}/api${url}`,
    data,
    headers: {
      ...(options.withToken && { token }),
      ...(options.withVisitorToken && { visitorToken }),
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