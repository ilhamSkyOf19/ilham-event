import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRegister, UserResponseType } from "@/types/Auth";
import { ResponseType } from "@/types/Response";

const authService = {
  // register
  register: (
    payload: IRegister,
  ): Promise<ResponseType<UserResponseType | null>> =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  // activation
  activation: (code: string): Promise<ResponseType<string | null>> => {
    return instance.post(`${endpoint.AUTH}/activation`, { code });
  },
};

// export
export default authService;
