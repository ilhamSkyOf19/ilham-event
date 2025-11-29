import { AuthLoginRequest, AuthRegisterRequest } from "../models/auth-model";
import { toUserResponseType, UserResponseType } from "../models/user-model";
import UserModel from "../schemas/user-schema";

export class UserService {
  // create
  static async create(
    req: AuthRegisterRequest
  ): Promise<UserResponseType | null> {
    // create
    const response = (await UserModel.create(req)).toObject();

    return toUserResponseType({
      ...response,
      _id: response._id.toString(),
    });
  }
}
