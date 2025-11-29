import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../utils/request-response-type";
import { verifyJwt } from "../utils/jwt";

export const authMiddleware =
  (role: "admin" | "user") =>
  (req: Request, res: Response<ResponseType<null>>, next: NextFunction) => {
    try {
      // get cookie
      const token = req.cookies.token;

      // cek cookie
      if (!token) {
        return res.status(401).json({
          status: "failed",
          message: "Unauthorized",
          data: null,
        });
      }

      // verify
      const payload = verifyJwt(token);

      //   cek role
      if (payload.role !== role) {
        return res.status(403).json({
          status: "failed",
          message: "Unauthorized",
          data: null,
        });
      }

      // set data
      req.body.data = payload;

      //   return
      return next();
    } catch (error) {
      // cek error
      console.log(error);
      // return
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
