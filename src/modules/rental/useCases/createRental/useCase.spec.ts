import dayjs from "dayjs";

import { RentalCarRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalCarRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/appError";

import { CreateRentalUseCase } from "./useCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalCarRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalCarRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });
  it("should be able to create a new car rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "xxxx",
      expect_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be not able to create a rental if user has already an open rental", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "xxxx",
        expect_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "aaa",
        expect_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a rental if car has already an open rental", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "000",
        car_id: "xxxx",
        expect_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "xxxx",
        expect_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
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
