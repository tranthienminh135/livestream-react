import axios from "axios";
import { axiosClient } from "./api-service";

export const getAllStatus = async () => {
  const res = await axiosClient.get("http://localhost:8080/status");
  return res.data;
};
