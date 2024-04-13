import { axiosClient } from "./api-service";

export const getAllPaymentStatus = async () => {
  const res = await axiosClient.get("/user/payment-status");
  return res.data;
};
