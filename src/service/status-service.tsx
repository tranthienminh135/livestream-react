import axios from "axios";

export const getAllStatus = async () => {
  const res = await axios.get("http://localhost:8080/status");
  return res.data;
};
