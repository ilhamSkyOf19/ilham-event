import { Request, Response, NextFunction } from "express";
import { ResponseType } from "../utils/request-type";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response<ResponseType<string | null>>,
  next: NextFunction
) => {
  console.log("Caught error:", err);

  // Duplicate key error
  if (err.code === 11000) {
    // get field
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: "failed",
      message: `Data ${field} already exists`,
      data: null,
    });
  }

  // Validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "failed",
      message: err.message,
      data: null,
    });
  }

  // Other errors
  return res.status(500).json({
    status: "failed",
    message: err.message || "Internal Server Error",
    data: null,
  });
};
