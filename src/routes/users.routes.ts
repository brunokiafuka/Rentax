import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/createUser/controller";
import UpdateUserAvatarController from "../modules/accounts/useCases/updateUserAvatar.ts/controller";

const usersRoutes = Router();
const updateUserAvatar = multer(uploadConfig.upload("./temp/avatar"));

usersRoutes.post("/", CreateUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  updateUserAvatar.single("avatar"),
  UpdateUserAvatarController.handle
);

export { usersRoutes };
