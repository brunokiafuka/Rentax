import { Router } from "express";

import CreateRentalController from "@modules/rental/useCases/createRental/controller";
import RentalDevolutionController from "@modules/rental/useCases/rentalDevolution/controller";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, CreateRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  RentalDevolutionController.handle
);

export { rentalRoutes };
