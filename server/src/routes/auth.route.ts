import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { AuthValidation } from "../validations/auth-validation";
import { AuthLoginRequest, AuthRegisterRequest } from "../models/auth-model";

export { Router } from "express";

const authRoute: Router = Router();

// register
authRoute.post(
  "/auth/register",
  validationMiddleware<AuthRegisterRequest>(AuthValidation.REGISTER),
  AuthController.register,
);

// login
authRoute.post(
  "/auth/login",
  validationMiddleware<AuthLoginRequest>(AuthValidation.LOGIN),
  AuthController.login,
);

// activation
authRoute.post("/auth/activation", AuthController.activate);

// export
export default authRoute;
