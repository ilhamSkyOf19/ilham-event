import { Express } from "express";
import swaggerOutput from "./swagger_output.json";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
export default function docs(app: Express) {
  // css
  const css = fs.readFileSync(
    path.join(__dirname, "../../public/swagger-ui/swagger-ui.css"),
    "utf8"
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCssUrl: css,
    })
  );
}
