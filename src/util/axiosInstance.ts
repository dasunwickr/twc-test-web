import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
  baseURL,
});

export const setApiAuthHeader = (token?: string) => {
  if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
      delete axiosInstance.defaults.headers.common.Authorization;
  }
}

export default axiosInstance;
