import z, { ZodType } from "zod";
import { AuthRegisterRequest } from "../models/auth-model";

export class AuthValidation {
  // REGISTER
  static readonly REGISTER = z
    .object({
      fullName: z.string(),
      username: z.string(),
      email: z.email(),
      password: z.string(),
      pictureUser: z.string(),
      role: z.enum(["admin", "user"]),
      isActive: z.boolean(),
      activeCode: z.string(),
    })
    .strict() satisfies ZodType<AuthRegisterRequest>;
}
