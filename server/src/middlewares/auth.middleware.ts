import { NextFunction, Request, Response } from "express";
import { AuthRequestType, ResponseType } from "../utils/request-response-type";
import { verifyJwt } from "../utils/jwt";

export default (
  req: AuthRequestType,
  res: Response<ResponseType<null>>,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
      data: null,
    });
  }

  const [prefix, accessToken] = authorization.split(" ");

  // cek
  if (prefix !== "Bearer" || !accessToken) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
      data: null,
    });
  }

  const user = verifyJwt(accessToken);

  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
      data: null,
    });
  }

  // set user
  req.data = user;

  next();
};
