import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/controller";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  CreateCarController.handle
);

export { carsRoutes };
