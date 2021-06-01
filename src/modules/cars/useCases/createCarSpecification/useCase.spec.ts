import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/appError";

import { CreateCarSpecificationUseCase } from "./useCase";

let createCarSpecification: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specifications", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add specifications to nonexistent car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ""["000"];
      await createCarSpecification.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a car specification", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car Description",
      license_plate: "ABC-1234",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    const { id } = await specificationsRepositoryInMemory.create({
      name: "SPEC",
      description: "TEST SPEC",
    });

    const specifications_id = [id];

    const carSpecifications = await createCarSpecification.execute({
      car_id,
      specifications_id,
    });

    expect(carSpecifications).toHaveProperty("specifications");
    expect(carSpecifications.specifications[0].id).toBe(id);
    expect(carSpecifications.specifications.length).toBe(1);
  });
});
