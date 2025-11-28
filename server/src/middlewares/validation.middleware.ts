import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { ResponseType } from "../utils/request-type";

export const validationMiddleware =
  <T>(schema: ZodType<T>) =>
  (
    req: Request<{}, {}, T>,
    res: Response<ResponseType<null>>,
    next: NextFunction
  ) => {
    try {
      // cek schema
      schema.parse(req.body);

      return next();
    } catch (error) {
      // cek error from zod
      if (error instanceof ZodError) {
        // error message
        const errorMessage = error.issues.map((issue) => issue.message)[0];

        // return
        return res.status(400).json({
          status: "failed",
          message: errorMessage,
          data: null,
        });
      }

      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
