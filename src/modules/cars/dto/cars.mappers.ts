import { Injectable } from '@nestjs/common';

import { UsersMapper } from '../../users/dto/users.mapper.js';
import { Car } from '../cars.entity.js';
import { CarsSaveDto } from './requests/cars.save-dto.js';
import { CarsDto } from './responses/cars.dto.js';

@Injectable()
class CarsMapper {
  constructor(private readonly usersMapper: UsersMapper) {}

  mapDtoToEntity(carSaveDto: CarsSaveDto): Car {
    let entity: Car = new Car();
    // entity.brand = carSaveDto.brand;
    // entity.model = carSaveDto.model;
    // entity.year = carSaveDto.year;
    // entity.vin = carSaveDto.vin;
    // entity.color = carSaveDto.color;

    entity = { ...entity, ...carSaveDto };
    return entity;
  }

  mapEntityToDto(entity: Car): CarsDto {
    let dto: CarsDto = new CarsDto();
    const { owner, active, ...restEntity } = entity;

    dto = { ...dto, ...restEntity };
    dto.owner = this.usersMapper.mapEntityToDto(owner);

    return dto;
  }

  mapEntityListToDtoList(entityList: Car[]): CarsDto[] {
    if (!entityList) {
      return [];
    }

    return entityList.map((car: Car) => this.mapEntityToDto(car));
  }
}

export { CarsMapper };
