import swaggerAutogen from "swagger-autogen";

// doc
const doc = {
  info: {
    version: "v0.0.1",
    title: "documentation API Event",
    description: "description API Event",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
      description: "Local server",
    },
    {
      url: "https://ilham-event-be.vercel.app/api",
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

// output file
const outputFile = "./src/docs/swagger_output.json";

// endpoints files
const endPointsFiles = ["./src/routes/auth.route.ts"];

// instance
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endPointsFiles, doc);
