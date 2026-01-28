import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// export
export type { IRegister };

export type IUser = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  pictureUser: string;
  role: "admin" | "user";
  isActive: boolean;
  activeCode: string;
  createdAt?: string;
};

export interface AuthLoginRequest {
  emailOrUsername: string;
  password: string;
}

// user response
export interface UserResponseType extends Omit<
  IUser,
  "password" | "isActive" | "activeCode" | "createdAt"
> {
  _id: string;
}

export interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

// session
export interface SessionExtended extends Session {
  accessToken?: string;
}

// jwt
export interface JWTExtended extends JWT {
  user?: UserExtended;
}
