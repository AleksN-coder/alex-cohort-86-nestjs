import { Injectable } from '@nestjs/common';
import { CarsRepository } from './cars.repository.js';
import { Car } from './cars.entity.js';
import { User } from '../users/users.entity.js';
import { UsersService } from './../users/users.service.js';
import { CarsMapper } from './dto/cars.mappers.js';
import { CarsDto } from './dto/responses/cars.dto.js';
import { CarsSaveDto } from './dto/requests/cars.save-dto.js';
import { CarsUpdateDto } from './dto/requests/cars.update-dto.js';

@Injectable()
class CarsService {
  constructor(
    private readonly repository: CarsRepository,
    private readonly usersService: UsersService,
    private readonly mapper: CarsMapper,
  ) {}

  async createCar(saveDto: CarsSaveDto): Promise<CarsDto> {
    const entity: Car = this.mapper.mapDtoToEntity(saveDto);

    entity.active = true;
    await this.repository.save(entity);

    return this.mapper.mapEntityToDto(entity);
  }

  async getAllActiveCars(): Promise<CarsDto[]> {
    const cars: Car[] = await this.repository.findAllActive();

    return this.mapper.mapEntityListToDtoList(cars);
  }

  async getActiveEntityById(id: number): Promise<Car | null> {
    const car: Car | null = await this.repository.findById(id);

    if (!car || !car.active) {
      return null;
    }

    return car;
  }

  async getActiveCarById(id: number): Promise<CarsDto | null> {
    const car: Car | null = await this.getActiveEntityById(id);

    if (!car || !car.active) {
      return null;
    }

    return this.mapper.mapEntityToDto(car);
  }

  async updateCar(id: number, carUpdateDto: CarsUpdateDto): Promise<void> {
    const foundedCar: Car | null = await this.repository.findById(id);

    if (foundedCar) {
      foundedCar.color =carUpdateDto.newColor;
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
    const car: Car | null = await this.getActiveEntityById(carId);
    const owner: User | null =
      await this.usersService.getActiveEntityById(ownerId);

    if (car && owner) {
      car.owner = owner;
      await this.repository.save(car);
    }
  }
}

export default CarsService;
