import Axios from "axios";
import { toast } from "react-toastify";

const BACKEND = process.env.REACT_APP_BACKEND;

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
      if (res.data.message) {
        toast.success(res.data.message);
      }
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data);
      }
      return false;
    });
};
