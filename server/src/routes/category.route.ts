import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { CategoryController } from "../controllers/category.controller";
import { ROLES } from "../utils/constanst";
import { aclMiddleware } from "../middlewares/acl.middleware";

const categoryRoute: Router = Router();

// create
categoryRoute.post(
  "/create",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  CategoryController.create,
);

// find all with pagination
categoryRoute.get("/all", CategoryController.findAllWithPagination);

// find detail by id
categoryRoute.get("/detail/:id", CategoryController.findDetailById);

// update
categoryRoute.patch(
  "/update/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  CategoryController.update,
);

// delete
categoryRoute.delete(
  "/delete/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  CategoryController.delete,
);

// export default
export default categoryRoute;
