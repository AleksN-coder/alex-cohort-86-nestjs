import { Injectable } from '@nestjs/common';
import { CarsRepository } from './cars.repository.js';
import { Car } from './cars.entity.js';
import { User } from '../users/users.entity.js';
import { UsersService } from './../users/users.service.js';

@Injectable()
class CarsService {
  constructor(
    private readonly repository: CarsRepository,
    private readonly usersService: UsersService,
  ) {}

  async createCar(car: Car): Promise<Car> {
    car.active = true;

    return await this.repository.save(car);
  }

  async getAllActiveCars(): Promise<Car[]> {
    return await this.repository.findAllActive();
  }

  async getActiveCarById(id: number): Promise<Car | null> {
    const car: Car | null = await this.repository.findById(id);

    if (!car || !car.active) {
      return null;
    }

    return car;
  }

  async updateCar(id: number, car: Car): Promise<void> {
    const foundedCar: Car | null = await this.repository.findById(id);

    if (foundedCar) {
      foundedCar.color = car.color;
      await this.repository.save(foundedCar);
    }
  }

  async deleteById(id: number): Promise<void> {
    const car: Car | null = await this.repository.findById(id);

    if (car) {
      car.active = false;
      await this.repository.save(car);
    }
  }

  async restoreById(id: number): Promise<void> {
    const car: Car | null = await this.repository.findById(id);

    if (car && !car.active) {
      car.active = true;
      await this.repository.save(car);
    }
  }

  async setActiveOwnerToActiveCar(
    carId: number,
    ownerId: number,
  ): Promise<void> {
    const car: Car | null = await this.getActiveCarById(carId);
    const owner: User | null =
      await this.usersService.getActiveUserById(ownerId);

    if (car && owner) {
      car.owner = owner;
      await this.repository.save(car);
    }
  }
}

export default CarsService;
