import { Express } from "express";
import swaggerOutput from "./swagger_output.json";
import swaggerUi from "swagger-ui-express";

export default function docs(app: Express) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCssUrl: "/swagger-ui/swagger-ui.css",
      customJs: "/swagger-ui/swagger-ui-bundle.js",
      customfavIcon: "/swagger-ui/favicon-32x32.png",
      customSiteTitle: "API Docs",
    })
  );
}
