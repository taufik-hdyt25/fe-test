import { API } from "@/lib/axios";

export const getAllUser = async () => {
  const resp = await API.get("/users");
  return resp.data;
};
