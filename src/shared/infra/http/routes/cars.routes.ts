import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/createCar/controller";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecification/controller";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/controller";
import UploadCarImageController from "@modules/cars/useCases/uploadCarImage/controller";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const uploadCarImages = multer(uploadConfig.upload("./temp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  CreateCarController.handle
);

carsRoutes.patch(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  CreateCarSpecificationController.handle
);

carsRoutes.get("/available", ListAvailableCarsController.handle);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  UploadCarImageController.handle
);

export { carsRoutes };
