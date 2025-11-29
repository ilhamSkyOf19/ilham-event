import { NextFunction, Request, Response } from "express";
import { AuthRegisterRequest } from "../models/auth-model";
import { ResponseType } from "../utils/request-type";
import { UserService } from "../services/auth.service";
import { UserResponseType } from "../models/user-model";

export class AuthController {
  // register
  static async register(
    req: Request<{}, {}, AuthRegisterRequest>,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const data = req.body;

      // call service
      const response = await UserService.create(data);

      // cek
      return res.status(200).json({
        status: "success",
        message: "berhasil",
        data: response,
      });
    } catch (error) {
      // error
      console.log(error);
      next(error);
    }
  }
}
