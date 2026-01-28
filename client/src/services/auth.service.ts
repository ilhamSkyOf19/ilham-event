import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRegister, UserResponseType } from "@/types/Auth";
import { ResponseType } from "@/types/Response";

const authService = {
  register: async (
    payload: IRegister,
  ): Promise<ResponseType<UserResponseType | null>> => {
    const res = await instance.post(`${endpoint.AUTH}/register`, payload);
    return res.data;
  },

  activation: async (code: string): Promise<ResponseType<string | null>> => {
    const res = await instance.post(`${endpoint.AUTH}/activation`, { code });
    return res.data;
  },
};

// export
export default authService;
