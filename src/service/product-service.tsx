import { axiosClient } from "./api-service";

export const get8NewProduct = async () => {
  const res = await axiosClient.get("/public/product/8new");
  return res.data;
};

export const getAllPageProduct = async (param: any) => {
  const res = await axiosClient.post("/public/product", param);
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await axiosClient.get(`/public/product/${id}`);
  return res.data;
};

export const addToCart = async (obj: any) => {
  const res = await axiosClient.post("/user/order", obj);
  return res.data;
};

export const get6PopularProduct = async () => {
  const res = await axiosClient.get("/public/product/popular");
  return res.data;
};

export const get4RecommendedProduct = async () => {
  const res = await axiosClient.get("/public/product/recommended");
  return res.data;
};

export const getMaxPriceProduct = async () => {
  const res = await axiosClient.get("/public/product/max-price");
  return res.data;
};
