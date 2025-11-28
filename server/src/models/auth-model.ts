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
