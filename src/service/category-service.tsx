import { axiosClient } from "./api-service";

export const getAllCategories = async () => {
  const res = await axiosClient.get("http://localhost:8080/public/category");
  return res.data;
};
