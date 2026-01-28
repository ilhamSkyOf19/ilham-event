import { NextFunction, Request, Response } from "express";
import { AuthLoginRequest, AuthRegisterRequest } from "../models/auth-model";
import { ResponseType } from "../utils/request-response-type";
import { UserService } from "../services/auth.service";
import { toUserResponseType, UserResponseType } from "../models/user-model";
import { PayloadJwtType } from "../models/jwt-model";
import { generateJwt } from "../utils/jwt";
import { encrypt } from "../utils/encrypt";
import UserModel from "../schemas/user-schema";

export class AuthController {
  // register
  static async register(
    req: Request<{}, {}, AuthRegisterRequest>,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction,
  ) {
    try {
      // get body
      const data = req.body;

      // call service
      const response = await UserService.create(data);

      // get payload
      const payload: PayloadJwtType = {
        _id: response?._id as string,
        fullName: response?.fullName ?? "",
        email: response?.email ?? "",
        username: response?.username ?? "",
        role: response?.role ?? "user",
      };

      // generate jwt
      const token = generateJwt(payload);

      // set cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        maxAge: 1000 * 60 * 60, // 1 jam
      });

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

  // login
  static async login(
    req: Request<{}, {}, AuthLoginRequest>,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction,
  ) {
    try {
      // get request body
      const data = req.body;

      // call service
      const response = await UserModel.findOne({
        $or: [
          { email: data.emailOrUsername },
          { username: data.emailOrUsername },
        ],
        isActive: true,
      });

      // cek response
      if (!response) {
        return res.status(401).json({
          status: "failed",
          message: "Email Or Username Or Password Not Found",
          data: null,
        });
      }

      // cek password
      const isRequestPassword = encrypt(data.password);

      if (response.password !== isRequestPassword) {
        return res.status(401).json({
          status: "failed",
          message: "Email Or Username Or Password Not Found",
          data: null,
        });
      }

      // get payload
      const payload: PayloadJwtType = {
        _id: response._id.toString(),
        fullName: response?.fullName,
        email: response?.email,
        username: response?.username,
        role: response?.role,
      };

      // generate jwt
      const token = generateJwt(payload);

      // set cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60, // 1 jam
      });

      return res.status(200).json({
        status: "success",
        message: "berhasil",
        data: toUserResponseType({
          ...response.toObject(),
          _id: response._id.toString(),
        }),
      });
    } catch (error) {
      // error
      console.log(error);
      next(error);
    }
  }

  // activate
  static async activate(
    req: Request<{}, {}, { code: string }>,
    res: Response<ResponseType<string | null>>,
    next: NextFunction,
  ) {
    try {
      // cek code
      if (!req.body.code) {
        return res.status(400).json({
          status: "failed",
          message: "Bad Request",
          data: null,
        });
      }

      // get query
      const code = req.body.code;

      // call service
      const response = await UserService.activate(code);

      // cek response
      if (!response) {
        return res.status(404).json({
          status: "failed",
          message: "Not Found",
          data: null,
        });
      }

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
