import axios from "axios";
import { stringify } from "querystring";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    prefix_token: "Bearer",
    "Accept-Language": "en",
  },
  paramsSerializer(params: any) {
    return stringify(params);
  },
});
