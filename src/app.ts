import express from "express";
import buildDatabase from "./DataBaseConnection";
require("dotenv").config();

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import TestSuiteRoutes from "./routes/TestSuiteRoutes";

export function createApp() {
  const app = express();

  buildDatabase();

  app.use(express.json());
  app.use(TestSuiteRoutes);

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hello World",
        version: "1.0.0",
      },
    },
    apis: ["./src/components/**/*.openapi.yaml"],
  };

  const openapiSpecification = swaggerJsdoc(options);

  app.use("/api", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

  
  return app;
}
