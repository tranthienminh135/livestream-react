import axios from "axios";
import { axiosClient } from "./api-service";

export const getAllPosition = async () => {
  const res = await axiosClient.get("http://localhost:8080/position");
  return res.data;
};
