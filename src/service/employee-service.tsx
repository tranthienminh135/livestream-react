import axios from "axios";

export const getAllEmployee = async () => {
  const res = await axios.get("http://localhost:8080/employee");
  return res.data;
};
