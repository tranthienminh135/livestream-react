import { axiosClient } from "./api-service";

export const get8NewProduct = async () => {
  const res = await axiosClient.get(
    "http://localhost:8080/public/product/8new"
  );
  return res.data;
};
