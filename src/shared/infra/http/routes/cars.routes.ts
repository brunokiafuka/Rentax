import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/controller";

const carsRoutes = Router();

carsRoutes.post("/", CreateCarController.handle);

export { carsRoutes };
