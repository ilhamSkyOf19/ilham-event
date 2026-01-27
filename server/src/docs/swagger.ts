import swaggerAutogen from "swagger-autogen";

const doc = {
  openapi: "3.0.0",
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Event",
    description: "Dokumentasi API Event",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
    {
      url: "https://ilham-event-be.vercel.app/api",
      description: "Production server",
    },
  ],
};

const outputFile = "./src/docs/swagger_output.json";
const endpointsFiles = ["./src/routes/auth.route.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
