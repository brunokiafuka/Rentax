import { CarImages } from "@modules/cars/infra/typorm/entities/CarImages";

export interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImages>;
}
