import axios from "axios";
import { getAdminToken, getUserToken } from "../util/getItem";

const url = import.meta.env.VITE_BASE_URL

const quizApi = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

quizApi.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    const adminToken = getAdminToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    } else if (adminToken) {
      config.headers["Authorization"] = "Bearer " + adminToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default quizApi;