import axios from "axios";

export const getAllPosition = async () => {
  const res = await axios.get("http://localhost:8080/position");
  return res.data;
};
