import "reflect-metadata";

import express from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { errorHandler } from "./middlewares/errorHandler";
import { router } from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

app.listen(3333, () => console.log("server is running"));