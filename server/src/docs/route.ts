import { Express } from "express";
import express from "express"; // <-- ini penting
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import path from "path";

export default function docs(app: Express) {
  // Serve static assets
  app.use(
    "/swagger-ui",
    express.static(path.join(__dirname, "../../public/swagger-ui-dist"))
  );

  // Setup Swagger UI
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCssUrl: "/swagger-ui/swagger-ui.css",
      customJs: "/swagger-ui/swagger-ui-bundle.js",
      customfavIcon: "/swagger-ui/favicon-32x32.png",
    })
  );
}
