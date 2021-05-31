import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/controller";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/controller";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  CreateCarController.handle
);

carsRoutes.get("/available", ListAvailableCarsController.handle);

export { carsRoutes };
