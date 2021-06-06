import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./useCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id,
      images_name,
    });

    return res.status(201).send();
  }
}

export default new UploadCarImageController();
