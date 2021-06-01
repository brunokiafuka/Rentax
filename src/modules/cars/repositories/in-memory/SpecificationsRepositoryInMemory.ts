import { Specification } from "@modules/cars/infra/typorm/entities/Specification";

import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from "../interfaces/ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ISpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(({ id }) => ids.includes(id));
  }
}

export { SpecificationsRepositoryInMemory };
