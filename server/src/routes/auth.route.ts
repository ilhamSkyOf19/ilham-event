import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { AuthValidation } from "../validations/auth-validation";
import { AuthRegisterRequest } from "../models/auth-model";

export { Router } from "express";

const authRoute: Router = Router();

// register
authRoute.post(
  "/register",
  validationMiddleware<AuthRegisterRequest>(AuthValidation.REGISTER),
  AuthController.register
);

// export
export default authRoute;
