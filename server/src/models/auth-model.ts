// auth register
export type AuthRegisterRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

// login
export type AuthLoginRequest = {
  emailOrUsername: string;
  password: string;
};
