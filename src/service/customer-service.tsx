import axios from "axios";
import { initRequestDto } from "../ui/customer/EmployeeApp";

export const getAllCustomer = async (requestDto: typeof initRequestDto) => {
  const res = await axios.post("http://localhost:8080/customer", requestDto);
  return res.data;
};
