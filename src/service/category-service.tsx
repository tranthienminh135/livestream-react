import { axiosClient } from "./api-service";

export const getAllCategories = async () => {
  const res = await axiosClient.get("/public/category");
  return res.data;
};

export const get8RandCategories = async () => {
  const res = await axiosClient.get("/public/category/8rand");
  return res.data;
};
