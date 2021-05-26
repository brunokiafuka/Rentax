import { Router } from "express";

import AuthenticateUserController from "@modules/accounts/useCases/authenticateUser/controller";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", AuthenticateUserController.handle);

export { authenticateRoutes };
