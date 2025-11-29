import { IUser } from "./user-model";

export type PayloadJwtType = Omit<
  IUser,
  "password" | "activeCode" | "isActive" | "pictureUser"
> & { _id: string };
