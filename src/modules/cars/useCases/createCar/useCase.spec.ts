import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/appError";

import { CreateCarUseCase } from "./useCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      license_plate: "ABC-1234",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    expect(car).toHaveProperty("id");
  });

  it("should be to create a car with availability set to true as default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Available",
      license_plate: "ABC-1235",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    expect(car.available).toBe(true);
  });

  it("should not be able to create a car with existing license plate", async () => {
    expect(async () => {
      const car1 = {
        name: "Car1",
        description: "Car Description",
        license_plate: "ABC-1234",
        daily_rate: 100,
        brand: "Car Brand",
        category_id: "Car CategoryId",
        fine_amount: 60,
      };
      const car2 = {
        name: "Car2",
        description: "Car Description",
        license_plate: "ABC-1234",
        daily_rate: 100,
        brand: "Car Brand",
        category_id: "Car CategoryId",
        fine_amount: 60,
      };

      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
