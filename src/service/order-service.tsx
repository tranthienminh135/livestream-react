import { axiosClient } from "./api-service";

export const showProductInCart = async () => {
  const res = await axiosClient.post("/user/order/show");
  return res.data;
};

export const payment = async (obj: any) => {
  const res = await axiosClient.post("/user/order/payment", obj);
  return res.data;
};

export const showProductHistory = async () => {
  const res = await axiosClient.post("/user/order/history");
  return res.data;
};
