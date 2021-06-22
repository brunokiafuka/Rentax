import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalCarRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalCarRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/appError";

import { CreateRentalUseCase } from "./useCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalCarRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalCarRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    );
  });
  it("should be able to create a new car rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car Test",
      license_plate: "ABC-1234",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expect_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be not able to create a rental if user has already an open rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car Test",
      license_plate: "ABC-1234",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expect_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "aaa",
        expect_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There is a rental in progress for this user!")
    );
  });

  it("should be not able to create a rental if car has already an open rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car Test",
      license_plate: "ABC-1234",
      daily_rate: 100,
      brand: "Car Brand",
      category_id: "Car CategoryId",
      fine_amount: 60,
    });

    await createRentalUseCase.execute({
      user_id: "000",
      car_id: car.id,
      expect_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: car.id,
        expect_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should be not able to create a rental if return date is less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "000",
        car_id: "xxxx",
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
