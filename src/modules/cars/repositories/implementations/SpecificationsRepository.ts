import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ISpecificationsDTO,
} from "../interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications!: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificationsDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    return this.specifications.find((specs) => specs.name === name);
  }
}

export { SpecificationsRepository };
