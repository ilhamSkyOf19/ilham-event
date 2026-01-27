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

// user response
export type UserResponseType = Omit<
  IUser,
  "password" | "isActive" | "activeCode" | "createdAt"
> & { _id: string };
