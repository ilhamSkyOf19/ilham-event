import z, { ZodType } from "zod";
import { AuthLoginRequest, AuthRegisterRequest } from "../models/auth-model";

export class AuthValidation {
  // REGISTER
  static readonly REGISTER = z
    .object({
      fullName: z.string(),
      username: z.string(),
      email: z.email(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword)
        ctx.addIssue({ code: "custom", message: "password doesn't match" });
    })
    .strict() satisfies ZodType<
    AuthRegisterRequest & { confirmPassword: string }
  >;

  // login
  static readonly LOGIN = z
    .object({
      emailOrUsername: z.string(),
      password: z.string(),
    })
    .strict() satisfies ZodType<AuthLoginRequest>;
}
