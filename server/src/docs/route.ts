import path from "path";
import swaggerUi from "swagger-ui-express";
import express from "express";
import fs from "fs";

export default function docs(app: express.Express) {
  const swaggerFilePath = path.resolve(__dirname, "swagger_output.json");
  const swaggerOutput = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
}
