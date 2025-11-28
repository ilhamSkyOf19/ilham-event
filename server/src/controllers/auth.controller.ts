import { NextFunction, Request, Response } from "express";
import { AuthRegisterRequest } from "../models/auth-model";
import { ResponseType } from "../utils/request-type";

export class AuthController {
  // register
  static async register(
    req: Request<{}, {}, AuthRegisterRequest>,
    res: Response<ResponseType<null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const data = req.body;

      // cek
      return res.status(200).json({
        status: "success",
        message: "berhasil",
        data: data as any,
      });
    } catch (error) {
      next(error);
    }
  }
}
