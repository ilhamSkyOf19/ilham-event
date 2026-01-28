import { AuthRegisterRequest } from "../models/auth-model";
import { PayloadJwtType } from "../models/jwt-model";
import { toUserResponseType, UserResponseType } from "../models/user-model";
import UserModel from "../schemas/user-schema";

export class UserService {
  // create
  static async create(
    req: AuthRegisterRequest,
  ): Promise<UserResponseType | null> {
    // create
    const response = (await UserModel.create(req)).toObject();

    return toUserResponseType({
      ...response,
      _id: response._id.toString(),
    });
  }

  // activate code
  static async activate(code: string): Promise<string | null> {
    // get response
    const response = await UserModel.findOneAndUpdate(
      { activeCode: code },
      { isActive: true },
      { new: true },
    );

    // return
    return response ? response.activeCode : null;
  }

  // find user by id
  static async findUserById(id: string): Promise<UserResponseType | null> {
    const response = await UserModel.findById(id).lean<UserResponseType>();

    // return
    if (!response) {
      return null;
    }

    return toUserResponseType({
      ...response,
      _id: response._id.toString(),
    });
  }
}
