import { Router } from "express";

import ResetUserPasswordController from "@modules/accounts/useCases/resetUserPassword/controller";
import SendForgotPasswordMailController from "@modules/accounts/useCases/sendForgotPasswordMail/controller";

const passwordRoutes = Router();

passwordRoutes.post("/forgot", SendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", ResetUserPasswordController.handle);

export { passwordRoutes };
