import { initRequestDto } from "../ui/customer/CustomerApp";
import { axiosClient } from "./api-service";

export const getAllCustomer = async (requestDto: typeof initRequestDto) => {
  const res = await axiosClient.post("/customer", requestDto);
  return res.data;
};

export const saveCustomer = async (customer: any) => {
  const res = await axiosClient.post("/customer/save", customer);
  return res.data;
};

export const getCustomerById = async (customer: any) => {
  const res = await axiosClient.post(`/customer/get`, customer);
  return res.data;
};

export const deleteCustomer = async (customer: any) => {
  const res = await axiosClient.post(`/customer/delete`, customer);
  return res.data;
};
