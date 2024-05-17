import { axiosClient } from "./api-service";

export const getAllMessage = async (obj: any) => {
  const res = await axiosClient.post("/user/chat/messages", obj);
  return res.data;
};
