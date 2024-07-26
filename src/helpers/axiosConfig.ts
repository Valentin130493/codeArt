import axios from "axios";
import { API_URL } from "../static/api.ts";
import { TOKEN } from "../static/storage.ts";

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers[`${TOKEN}`] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    return Promise.reject(err);
  },
);

export default axiosInstance;
