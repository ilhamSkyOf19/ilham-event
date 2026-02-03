import { NextFunction, Response } from "express";
import { AuthRequestType, ResponseType } from "../utils/request-response-type";

export const aclMiddleware =
  (roles: string[]) =>
  (
    req: AuthRequestType,
    res: Response<ResponseType<string | null>>,
    next: NextFunction,
  ) => {
    try {
      // get user roles from request
      const userRoles = req.data?.role;

      // check roles
      if (!userRoles || !roles.includes(userRoles)) {
        return res.status(403).json({
          status: "failed",
          message: "Forbidden",
          data: null,
        });
      }

      return next();
    } catch (error) {
      // return internal server error
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
