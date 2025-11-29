// user interface
export type IUser = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  pictureUser: string;
  role: "admin" | "user";
  isActive: boolean;
  activeCode: string;
};

// user response
export type UserResponseType = Omit<IUser, "password"> & { _id: string };

// to response
export const toUserResponseType = (
  user: IUser & { _id: string }
): UserResponseType => {
  return {
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    pictureUser: user.pictureUser,
    role: user.role,
    isActive: user.isActive,
    activeCode: user.activeCode,
  };
};
