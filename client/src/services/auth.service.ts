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
};

// export
export default authService;
