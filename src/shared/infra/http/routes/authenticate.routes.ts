import { Router } from "express";

import AuthenticateUserController from "@modules/accounts/useCases/authenticateUser/controller";
import RefreshTokenController from "@modules/accounts/useCases/refreshToken/controller";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", AuthenticateUserController.handle);
authenticateRoutes.post("/refresh-token", RefreshTokenController.handle);

export { authenticateRoutes };
