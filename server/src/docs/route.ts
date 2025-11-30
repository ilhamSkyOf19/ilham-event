import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";
import swaggerDist from "swagger-ui-dist";

export default function docs(app: Express) {
  const swaggerDistPath = swaggerDist.absolutePath();

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, undefined, undefined, swaggerDistPath)
  );
}
