import path from "path";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";
import swaggerDist from "swagger-ui-dist";

export default function docs(app: Express) {
  const swaggerDistPath = swaggerDist.absolutePath();

  // serve seluruh folder swagger-ui-dist
  app.use("/swagger-ui-dist", express.static(swaggerDistPath));

  // setup Swagger UI
  app.use(
    "/api-docs",
    swaggerUi.serveFiles(swaggerDocument, { swaggerUrl: "/api-docs" }),
    swaggerUi.setup(swaggerDocument, {
      customCssUrl: "/swagger-ui-dist/swagger-ui.css",
      customJs: "/swagger-ui-dist/swagger-ui-bundle.js",
      customfavIcon: "/swagger-ui-dist/favicon-32x32.png",
    })
  );
}
