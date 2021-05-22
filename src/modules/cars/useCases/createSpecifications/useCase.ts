import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationsUseCase };
