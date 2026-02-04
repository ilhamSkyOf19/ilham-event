import { ZodType } from "zod";
import { ResponseType } from "./request-response-type";

export const validationRequest = <T>(
  schema: ZodType<T>,
  req: T,
): ResponseType<T | null> => {
  // cek result
  const result = schema.safeParse(req);

  //   cek result
  if (!result.success) {
    return {
      status: "failed",
      message: result.error.issues.map((issue) => issue.message)[0],
      data: null,
    };
  }

  // return
  return {
    status: "success",
    message: "Validation successful",
    data: result.data,
  };
};
