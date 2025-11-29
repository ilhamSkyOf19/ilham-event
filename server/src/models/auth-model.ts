// auth register
export type AuthRegisterRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  pictureUser: string;
  role: "admin" | "user";
  isActive: boolean;
  activeCode: string;
};

// login
export type AuthLoginRequest = {
  emailOrUsername: string;
  password: string;
};
