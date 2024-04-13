import { axiosClient } from "./api-service";

export const showProductInCart = async () => {
  const res = await axiosClient.post("/user/order/show");
  return res.data;
};
