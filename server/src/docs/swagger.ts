import swaggerAutogen from "swagger-autogen";

// swagger definition
const doc = {
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
      url: "https://ilham-event-be.app/api",
      description: "Production server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        emailOrUsername: "ilham123",
        password: "123",
      },
    },
  },
};

const outputFile = "./src/docs/swagger_output.json";
const endpointsFiles = ["./src/routes/auth.route.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
