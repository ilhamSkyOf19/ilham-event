import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { AuthLoginRequest, IRegister, UserResponseType } from "@/types/Auth";
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

  // login
  login: async ({
    emailOrUsername,
    password,
  }: AuthLoginRequest): Promise<ResponseType<{ token: string } | null>> => {
    const res = await instance.post(`${endpoint.AUTH}/login`, {
      emailOrUsername,
      password,
    });
    return res.data;
  },

  // get profile
  getProfile: async (
    token: string,
  ): Promise<ResponseType<UserResponseType>> => {
    const res = await instance
      .get(`${endpoint.AUTH}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

    return res;
  },
};

// export
export default authService;
