import { Router } from "express";

import CreateRentalController from "@modules/rental/useCases/createRental/controller";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, CreateRentalController.handle);

export { rentalRoutes };
