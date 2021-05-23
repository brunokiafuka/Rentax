import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./useCase";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    console.log(req.file);

    const authUserUseCase = container.resolve(UpdateUserAvatarUseCase);

    await authUserUseCase.execute({ user_id: id, avatarFile: avatar_file });

    return res.status(204).send();
  }
}

export default new UpdateUserAvatarController();
