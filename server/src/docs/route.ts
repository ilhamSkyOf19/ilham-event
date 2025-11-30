import { Express } from "express";
import swaggerOutput from "./swagger_output.json";
import swaggerUi from "swagger-ui-express";
import path from "path";

export default function docs(app: Express) {
  // css
  const css = path.join(
    __dirname,
    "../../node_modules/swagger-ui-dist/swagger-ui.css"
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCss: css,
    })
  );
}
