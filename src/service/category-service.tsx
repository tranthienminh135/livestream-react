import { axiosClient } from "./api-service";

export const getAllCategories = async () => {
  const res = await axiosClient.get("/public/category");
  return res.data;
};

export const get4RandCategories = async () => {
  const res = await axiosClient.get("/public/category/4rand");
  return res.data;
};
