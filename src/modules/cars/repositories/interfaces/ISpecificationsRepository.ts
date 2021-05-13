import { Specification } from "../../models/Specification";

export interface ISpecificationsDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create(data: ISpecificationsDTO): void;
  findByName(name: string): Specification;
}
