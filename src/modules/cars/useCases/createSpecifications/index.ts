import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationsController } from "./controller";
import { CreateSpecificationsUseCase } from "./useCase";

const categoryRepository = SpecificationsRepository.getInstance();
const createSpecificationsUseCase = new CreateSpecificationsUseCase(
  categoryRepository
);

const createSpecificationsController = new CreateSpecificationsController(
  createSpecificationsUseCase
);

export { createSpecificationsController };
