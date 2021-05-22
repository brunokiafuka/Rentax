import { Router } from "express";

import CreateUserController from "../modules/accounts/useCases/createUser/controller";

const usersRoutes = Router();

usersRoutes.post("/", CreateUserController.handle);

export { usersRoutes };
