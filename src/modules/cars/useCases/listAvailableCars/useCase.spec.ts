import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";

import { ListAvailableCarsUseCase } from "./useCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car Description",
      license_plate: "ABC-1234",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car Description",
      license_plate: "ABC-5000",
      daily_rate: 100,
      brand: "Car_Brand_test",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name 000",
      description: "Car Description",
      license_plate: "ABC-5000",
      daily_rate: 100,
      brand: "Car_Brand_test",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car Name 000",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name 000",
      description: "Car Description",
      license_plate: "ABC-5000",
      daily_rate: 100,
      brand: "Car_Brand_test",
      category_id: "12345",
      fine_amount: 60,
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
