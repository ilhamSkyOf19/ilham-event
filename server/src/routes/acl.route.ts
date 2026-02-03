import { Request, Response, Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { aclMiddleware } from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constanst";

const aclRoute: Router = Router();

// test
aclRoute.get(
  "/test",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  (_req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "berhasil",
      data: null,
    });
  },
);

export default aclRoute;
